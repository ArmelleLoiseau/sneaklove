// get document elements 
  // tags checkbox on home page 
  const tagListElement = document.getElementById("tag_list")
  const tagCheckboxElements = document.querySelectorAll(".checkbox-input")
  
  // Dom manipulation : 
  
  // Ajax function : 
  const createFilter = payload => {
    axios
    .get("/filterTag", {params:   payload})
    .then(filteredList => console.log(filteredList)) 
    .catch((e) => console.error(e));
  }

  
  // Handling function : 
  // add a tag in sneaker creation form
   function handleTagFilter(e){
     const tagId = e.target.getAttribute("data-tag-id")
     createFilter({ id : tagId })
   }
  
  
  
  // tags checkbox on home page 
  tagCheckboxElements.forEach(el => el.onclick = handleTagFilter );

  