import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  timeStart: {
    type: Number,
    required: true,
  },
  timeEnd: {
    type: Number,
    required: true,
  },
  ordersReports: [{
    orderId: {
      type: Number,
      required: true,
    },
    timeStart: {
      type: Number,
      required: true,
    },
    timeEnd: {
      type: Number,
      required: true,
    },
  }]
});

export const ReportModel = mongoose.model('Report', ReportSchema);
