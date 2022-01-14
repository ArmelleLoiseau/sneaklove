// add new tags when creating a new pair of Sneakers
const tagInput = document.getElementById("new_tag_name");
const addTagBtnElement = document.getElementById("btn_new_tag");
const selectElement = document.getElementById("id_tags");

// Dom manipulation : ad a new option with new tag
const addNewTag = (arg) => {
  const option = document.createElement("option");
  option.textContent = tagInput.value;
  //   option.value ??
  selectElement.appendChild(option);
};
// Ajax function : save new tag in DB

const createNewTag = (payload) => axios.post("/dashboard/create/tag", payload);

// Handling function : respond to click on button
function handleAddTag() {
  const newTag = tagInput.value;
  createNewTag({
    label: tagInput.value,
  })
    .then((newTag) => addNewTag(newTag))
    .catch((error) => console.error(error));
}

addTagBtnElement.onclick = handleAddTag;
