const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const VolunteeringProgram = Schema({
  _id: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false }
});

const Volunteer = new Schema({
  firstName: { type: String, default: '', trim: true },
  lastName: { type: String, default: '', trim: true },
  taz: { type: String, default: '', trim: true },
  cellphone: { type: String, default: '', trim: true },
  email: { type: String, default: '', trim: true },
  city: { type: String, default: '', trim: true },
  volunteerType: { type: String, default: '', trim: true },
  gender: { type: String, default: '', trim: true },
  status: { type: String, default: '', trim: true },
  weekdayAvailability: [{ type: String, default: '' }],
  yearJoined: { type: Number, default: () => new Date().getFullYear() },
  reportedHours: { type: Number, default: 0 },  // mayan - dev team, do we need it?
  approvedHours: { type: Number, default: 0 }, // mayan - dev team, do we need it?
  policeCertification: { type: Boolean, default: false },
  otherDocuments: { type: Boolean, default: false },
  birth: { type: Date, default: Date.now },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now }, // mayan - dev team, how this field is updated?
  
  // gender: { type: String, trim: true, default: '' },
  // policeCertification: { type: Boolean, default: false },
  // otherDocuments: { type: Boolean, default: false },
  // cellphone: { type: String, trim: true, default: '' },
  // email: { type: String, trim: true, default: '' },
  // city: { type: String, trim: true, default: '' },
  // volunteerType: { type: String, trim: true, default: '' },
  // yearJoined: { type: Number, default: new Date().getFullYear() },
  // weekdayAvailability: [{ type: String, default: '' }],
  // status: { type: String, trim: true, default: '' },

  volunteeringProgram: [{ type: String, default: '' }], //will be array with single string
  hours: { type: Array, default: [] }, // NAAMA removed [...] //will be array of object like : [{date:'12.03.2022',start:'13:00',end:'16:00',verified:'false'}]
  talkSummary: { type: String, trim: true, default: '' },

  studentoption:{ type: String, trim: true, default: '' },
  scholarshipName:{ type: String, trim: true, default: '' },
  officerName:{ type: String, trim: true, default: '' },
  officerPhone: { type: String, default: '', trim: true },
  hasDrivingLicence:{ type: String, default: '', trim: true },
  availableInEmergency:{ type: String, default: '', trim: true },
  educationalInstitution:{ type: String, trim: true, default: '' },
  address:{ type: String, trim: true, default: '' }


});

module.exports = model('Volunteer', Volunteer);
