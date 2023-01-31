import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { DebounceInput } from "react-debounce-input";
import {
  loadVolunteers,
  searchVolunteers,
  filterVolunteersByStatus,
  saveVolunteer
} from '../store/actions/volunteerActions';
import NewVolunteerModal from '../components/NewVolunteerModal';
import ProfileVolunteerModal from '../components/ProfileVolunteerModal';

import { ReactComponent as NewLead } from '../assets/imgs/icons/status/new-lead.svg';
import { ReactComponent as Standby } from '../assets/imgs/icons/status/standby.svg';
import { ReactComponent as Active } from '../assets/imgs/icons/status/active.svg';
import { ReactComponent as Inactive } from '../assets/imgs/icons/status/inactive.svg';

// import Footer from "../components/Footer";

// import { ReactComponent as SearchIcon } from "../assets/imgs/icons/search-icon.svg";
// import { ReactComponent as ExportIcon } from "../assets/imgs/icons/export-icon.svg";
// import { ReactComponent as AddVolunteerIcon } from "../assets/imgs/icons/add-person-icon.svg";
import BasePage from '../pages/BasePage';
import BaseTable from '../components/BaseTable';
import FilterableHeaderCell from '../components/FilterableHeaderCell';
import StatusTabs from '../components/StatusTabs';
import { Navigate, useNavigate } from 'react-router-dom';
import Approve from '../components/Approve';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { BsFillCheckSquareFill } from 'react-icons/bs';
// import { ReactComponent as ClearIcon } from '../assets/imgs/icons/close-icon.svg';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { volunteers, volunteersToShow } = useSelector((state) => state.volunteerReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { volunteer } = useSelector((state) => state.volunteerReducer);
  const exportRef = useRef(null);
  const csvBtnRef = useRef(null);
  const [isNewVolModalOpen, setNewVolModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [volunteerProfileToShow, setVolunteerProfileToShow] = useState({});
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [editVolunteer, setEditVolunteer] = useState({
    ...volunteer
  });
  const [activeFilter, setActiveFilter] = useState('');
  const [filter, setFilter] = useState({
    status: '',
    volunteeringProgram: '',
    volunteerType: ''
  });
  console.log(user);
  const filterOptions = useMemo(() => {
    if (!volunteers) return {};
    const retval = volunteers.reduce((acc, curr) => {
      Object.keys(filter).forEach((key) => {
        acc[key].add(curr[key]);
      });
      return acc;
    }, createInitialFilterOptions());
    Object.keys(retval).forEach((key) => {
      retval[key] = Array.from(retval[key]);
    });
    return retval;
  }, [createInitialFilterOptions, filter, volunteers]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function createInitialFilterOptions() {
    const retval = {};
    Object.keys(filter).forEach((key) => {
      retval[key] = new Set();
      retval[key].add('בחר הכל');
    });
    return retval;
  }

  const [isEdited,setIsEdited]=useState(false);
  
  const openProfileModal = (volunteer) => {
    console.log(volunteer);
    setProfileModalOpen(true);
    setVolunteerProfileToShow(volunteer);
  };

  useEffect(() => {
    dispatch(loadVolunteers());
  }, [isProfileModalOpen, isNewVolModalOpen, dispatch]);

  const onSetFilter = (filterBy) => {
    setFilter({
      ...filter,
      [activeFilter]: filterBy
    });
    setActiveFilter('');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFilterableHeaderCellProps = (name, title) => {
    return {
      title,
      onToggleDropdown: ({ bottom, left }) => {
        setDropdownPosition({ top: bottom, left });
        activeFilter === name ? setActiveFilter('') : setActiveFilter(name);
      }
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statuses = [
    { type: 'active', label: 'פעיל', icon: <Active /> },
    { type: 'standby', label: 'מושהה', icon: <Standby /> },
    { type: 'inactive', label: 'לא פעיל', icon: <Inactive /> }
  ];

  const columns = useMemo(
    () => [
      {
        field: 'firstName',
        headerName: 'שם פרטי',
        description: 'שם פרטי',
        flex: 1,
        valueGetter: (params) => `${params.row.firstName}` || '',
        renderCell: (params) => (
          <div className="name-status">
            {statuses.find((status) => status.type === params.row.status)?.icon || <Standby />}
            {params.row.firstName}
          </div>
        )
      },
      {
        field: 'lastName',
        headerName: 'שם משפחה',
        description: 'שם משפחה',
        flex: 1,
        valueGetter: (params) => params.row.lastName || ''
      },
      {
        field: 'taz',
        headerName: 'ת.ז',
        flex: 1,
        valueGetter: (params) => params.row.taz || '-'
      },
      {
        field: 'volunteeringProgram.name',
        headerName: 'מסגרת',
        description: 'מסגרת',
        flex: 1,
        renderHeader: () => <FilterableHeaderCell {...getFilterableHeaderCellProps('volunteeringProgram', 'מסגרת')} />,
        valueGetter: (params) => params.row.volunteeringProgram?.name || ''
      },
      {
        field: 'volunteerType',
        headerName: 'מסגרת מפנה',
        description: 'מסגרת מפנה',
        flex: 1,
        renderHeader: () => <FilterableHeaderCell {...getFilterableHeaderCellProps('volunteerType', 'תכנית')} />,
        valueGetter: (params) => {
          if (params.row.scholarship) {
            return `מלגה, ${params.row.scholarship}`;
          }
          return params.row.volunteerType || '';
        }
      },
      {
        field: 'volunteerHours',
        headerName: 'שעות מדווחות',
        description: 'שעות מדווחות',
        flex: 0.5,
        sortable: false,
        valueFormatter: ({ _id }) => {
          const volunteer = volunteers?.find((volunteer) => volunteer._id === _id);
          const volunteerHours = volunteer?.reportedHours || 0;
          return volunteerHours;
        },
        renderCell: (params) => (
          <>
            <span className="reported-hours">{params.row.reportedHours || 0}</span>
          </>
        )
      },
      /*{
        field: 'volunteerApproveHours',
        headerName: "דיווח שעות אחרון לאישור:",
        description: 'שעות מדווחות',
        flex:2,
        sortable: false,
        renderCell: (params) => (
          <>
            <Approve row={params.row} />
          </>
        )
      },*/
      {
        field: 'actions',
        type: 'actions',
        flex: 2,
        headerName: 'דיווח שעות אחרון לאישור:',
        getActions: (params) => [<Approve row={params.row} approveHours={approveHours} />]
      }
    ],
    [getFilterableHeaderCellProps, statuses, volunteers]
  );
  if (!user) {
    navigate('/login');
  }
  function setStatusFilter(status) {
    alert(`status has changed to: ${status}`);
  }

  function approveHours(row) {
    //naama

    let hours = row.hours;
    if (!hours || !hours.length) return;
    if (hours[0].verified === true || hours[0].verified === 'true') return;
    let lastHours = hours.shift();
    let hoursApproval = { ...lastHours, verified: true };
    let volHours = [hoursApproval, ...hours];

    row.hours = volHours;
    let currVol = { ...row, hours: volHours };
    console.log(currVol, '/n', lastHours, '/n', hoursApproval);
    setIsEdited(true);
    setEditVolunteer(currVol);
  }

  useEffect(() => {
    if (isEdited) {
      dispatch(saveVolunteer(editVolunteer, user));
      console.log(editVolunteer._id);
      setIsEdited(false);
    }
  }, [editVolunteer]);

  return (
    <BasePage
      title="טבלת מתנדבים"
      doSearch={(searchWord) => {
        dispatch(searchVolunteers(searchWord, undefined));
      }}
      doExport={() => exportRef.current()}
      onAdd={() => setNewVolModalOpen(true)}
    >
      <StatusTabs
        setStatusFilter={(status) => {
          dispatch(searchVolunteers(undefined, status));
        }}
      />
      <BaseTable
        entities={volunteersToShow}
        columns={columns}
        exportRef={exportRef}
        csvBtnRef={csvBtnRef}
        exportFileName="לשובע-מתנדבים-"
        activeFilter={activeFilter}
        dropdownPosition={dropdownPosition}
        filterOptions={filterOptions}
        onSetFilter={onSetFilter}
        filter={filter}
        onEntityClick={openProfileModal}
      />
      {isNewVolModalOpen && <NewVolunteerModal open={isNewVolModalOpen} setOpen={setNewVolModalOpen} />}
      {isProfileModalOpen && (
        <ProfileVolunteerModal
          volunteers={volunteers}
          volunteer={volunteerProfileToShow}
          open={isProfileModalOpen}
          setOpen={setProfileModalOpen}
          statuses={statuses}
        />
      )}
    </BasePage>
  );
};

export default Home;
