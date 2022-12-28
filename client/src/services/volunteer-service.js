import { httpService } from './http-service';

export const volunteerService = {
  saveVolunteer,
  query,
  getVolunteerById,
};

const BASE_URL = 'volunteer';

function query({ isDefault, doReset } = {}) {
  return httpService.get(`${BASE_URL}`);
}

function saveVolunteer(volunteer,user="") {
  return volunteer._id ? _updateVolunteer(volunteer,user) : _addVolunteer(volunteer);
}

function _updateVolunteer(volunteer,user) {
  console.log("update id:",volunteer._id)
  if (!user || volunteer.email===user.email) {
    return httpService.put(`${BASE_URL}/${BASE_URL}/${volunteer._id}`, volunteer);
  }
  else {
    console.log("update vol by admin")
    return httpService.put(`${BASE_URL}/admin/${volunteer._id}`, volunteer);  
  }
}

//naama
function getVolunteerById(volunteerId) {
  console.log("id to get:",volunteerId)
  return httpService.get(`${BASE_URL}/${volunteerId}`,volunteerId);
}

async function _addVolunteer(volunteer) {
  const { files, ...volunteerJSON } = volunteer;
  const formData = new FormData();
  const json = JSON.stringify(volunteerJSON);
  formData.append('document', json);
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const currFile = files.item(i);
      formData.append(currFile.name, currFile);
    }
  }
  return await httpService.post(`${BASE_URL}`, formData);
}
