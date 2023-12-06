import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";

const editTemp = (character) => html`
        <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form" @submit=${submitHandler}>
              <input
              type="text"
              name="category"
              id="category"
              value=${character.category}
              placeholder="Character Type"
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              value=${character.imageUrl}
              placeholder="Image URL"
            />
            <textarea
            id="description"
            .value=${character.description}
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          ></textarea>
          <textarea
            id="additional-info"
            .value=${character.moreInfo}
            name="additional-info"7
            placeholder="Additional Info"
            rows="2"
            cols="10"
          ></textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`;

let context = null;

export async function showEdit(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const data = await dataService.getSingleCharacter(id);
    ctx.render(editTemp(data));
}

async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const category = formData.get("category");
    const imageUrl = formData.get("image-url");
    const description = formData.get("description");
    const moreInfo = formData.get("additional-info");

    if (!category || !imageUrl || !description || !moreInfo) {
        return window.alert("Error")
    }
    const id = context.params.id;
    await dataService.updateCharacter(id, {category, imageUrl, description, moreInfo});
    context.goTo(`/details/${id}`);
}