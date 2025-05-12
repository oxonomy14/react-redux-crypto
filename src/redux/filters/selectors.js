import { selectContacts } from "../contacts/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectNameFilter = (state) => state.filters.filterValue;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterValue) => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedFilter) ||
        item.number.toLowerCase().includes(normalizedFilter)
    );
  }
);
