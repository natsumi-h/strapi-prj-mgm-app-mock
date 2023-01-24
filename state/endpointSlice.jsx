import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config";

const initialState = {
  orderBy: "updatedAt",
  ascDesc: "desc",
  endpointType: "sort",
  pageNumber: 1,
  ascDescId: "desc",
  ascDescCreatedAt: "desc",
  ascDescUpdatedAt: "desc",
  ascDescSales: "desc",
  endpointUrl: `${API_URL}/projects?populate=*&sort[0]=updatedAt:desc&pagination[page]=1&pagination[pageSize]=10`,
};

export const endpointSlice = createSlice({
  name: "endpoint",
  initialState,
  reducers: {
    newAscDescId: (state) => {
      if (state.ascDescId == "asc") {
        state.ascDescId = "desc";
      } else {
        state.ascDescId = "asc";
      }
      state.ascDesc = state.ascDescId;
      state.pageNumber = 1;
      state.orderBy = "id";
      state.ascDescCreatedAt = "desc";
      state.ascDescUpdateAt = "desc";
      state.ascDescSales = "desc";
      state.endpointUrl = `${API_URL}/projects?populate=*&sort[0]=id:${state.ascDescId}&pagination[page]=${state.pageNumber}&pagination[pageSize]=10`;
    },
    newAscDescCreatedAt: (state) => {
      if (state.ascDescCreatedAt == "asc") {
        state.ascDescCreatedAt = "desc";
      } else {
        state.ascDescCreatedAt = "asc";
      }
      state.ascDesc = state.ascDescCreatedAt;
      state.pageNumber = 1;
      state.orderBy = "createdAt";
      state.ascDescId = "desc";
      state.ascDescUpdateAt = "desc";
      state.ascDescSales = "desc";
      state.endpointUrl = `${API_URL}/projects?populate=*&sort[0]=createdAt:${state.ascDescCreatedAt}&pagination[page]=${state.pageNumber}&pagination[pageSize]=10`;
    },
    newAscDescUpdatedAt: (state) => {
      if (state.ascDescUpdatedAt == "asc") {
        state.ascDescUpdatedAt = "desc";
      } else {
        state.ascDescUpdatedAt = "asc";
      }
      state.ascDesc = state.ascDescUpdateAt;
      state.pageNumber = 1;
      state.orderBy = "updatedAt";
      state.ascDescId = "desc";
      state.ascDescCreatedAt = "desc";
      state.ascDescSales = "desc";
      state.endpointUrl = `${API_URL}/projects?populate=*&sort[0]=updatedAt:${state.ascDescUpdatedAt}&pagination[page]=${state.pageNumber}&pagination[pageSize]=10`;
    },
    newAscDescSales: (state) => {
      if (state.ascDescSales == "asc") {
        state.ascDescSales = "desc";
      } else {
        state.ascDescSales = "asc";
      }
      state.ascDesc = state.ascDescSales;
      state.pageNumber = 1;
      state.orderBy = "sales";
      state.ascDescId = "desc";
      state.ascDescCreatedAt = "desc";
      state.ascDescUpdateAt = "desc";
      state.endpointUrl = `${API_URL}/projects?populate=*&sort[0]=sales:${state.ascDesc}&pagination[page]=${state.pageNumber}&pagination[pageSize]=10`;
    },
    newPageNumber: (state, action) => {
      state.endpointType = "sort";
      if (action.payload == "prevButton") {
        state.pageNumber -= 1;
      } else if (action.payload == "nextButton") {
        state.pageNumber += 1;
      } else {
        state.pageNumber = action.payload;
      }
      state.endpointUrl = `${API_URL}/projects?populate=*&sort[0]=${state.orderBy}:${state.ascDesc}&pagination[page]=${state.pageNumber}&pagination[pageSize]=10`;
    },
    reset: () => initialState,
  },
});

export const {
  newAscDescId,
  newAscDescCreatedAt,
  newAscDescUpdatedAt,
  newAscDescSales,
  newPageNumber,
  reset,
} = endpointSlice.actions;

export const endpointReducer = endpointSlice.reducer;
