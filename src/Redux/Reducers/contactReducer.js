const storedContacts = localStorage.getItem("contacts");
const initialState = storedContacts ? JSON.parse(storedContacts) : [];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      localStorage.setItem("contacts", JSON.stringify(state)); // Save to localStorage
      return state;

      // case "UPDATE_CONTACT": // Add the update action handling
      // state = state.map((contact, index) =>
      //   index === action.payload.index ? { ...contact, ...action.payload.data } : contact
      // );
      // localStorage.setItem("contacts", JSON.stringify(state));
      // return state;
      
      case "UPDATE_CONTACT":
  const updatedState = state.map((contact, index) => {
    if (index === action.payload.index) {
      const updatedData = {
        ...contact.data, // Spread the existing data properties
        firstname: action.payload.data.firstname, // Update the firstname
        lastname: action.payload.data.lastname, // Update the lastname
      };

      const updatedContact = {
        ...contact,
        data: updatedData, // Update the data property
      };

      return updatedContact;
    } else {
      return contact;
    }
  });
  localStorage.setItem("contacts", JSON.stringify(updatedState));
  return updatedState;

      case "DELETE_CONTACT":
        const newState = [...state];
        newState.splice(action.payload, 1);
        localStorage.setItem("contacts", JSON.stringify(newState));
        return newState;
    default:
      return state;
  }
};
export default contactReducer;
