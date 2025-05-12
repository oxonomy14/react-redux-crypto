export const selectContacts = (state) => state.contactList.contacts.items;
export const selectLoading = (state) => state.contactList.contacts.loading;
export const selectError = (state) => state.contactList.contacts.error;
export const selectSuccess = (state) => state.contactList.contacts.success;
export const selectIsEdit = (state) => state.contactList.contacts.isEdit;
export const selectCurrentContact = (state) =>
  state.contactList.contacts.currentContact;
export const selectIsDelete = (state) => state.contactList.contacts.isDelete;
