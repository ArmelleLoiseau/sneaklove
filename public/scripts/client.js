// add new tags when creating a new pair of Sneakers
const tagInput = document.getElementById("new_tag_name");
const addTagBtnElement = document.getElementById("btn_new_tag");
const selectElement = document.getElementById("tags");

// Dom manipulation : ad a new option with new tag
const addNewTag = () => {
  const option = document.createElement("option");
  option.textContent = tagInput.value;
  selectElement.appendChild(option);
};
// Ajax function : save new tag in DB

const createNewTag = (payload) => {
  console.log("createNewTag --->", payload);
  axios
    .post("/dashboard/create/tag", payload)
    .then(addNewTag)
    .catch((e) => console.error(e));
};

// Handling function : respond to click on button
function handleAddTag(e) {
  // e.preventDefault();
  const newTag = tagInput.value;
  console.log("handleAddTag ---> the input is", newTag);
  createNewTag({
    label: newTag,
  });
}

addTagBtnElement.onclick = handleAddTag;
