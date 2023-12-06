import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";
import { userHelper } from "../userHelper.js";

const detailsTemp = (item, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <div>
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                 ${item.description}
                  </p>
                   <p id ="more-info">
                   ${item.moreInfo}
                        </p>
              </div>
            </div>
              <h3>Is This Useful:<span id="likes">0</span></h3>
              
              ${isOwner ? 
                html`
                <div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click=${delChar} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>` 
                : ""
               }

             <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="" id="like-btn">Like</a>

          </div>
            </div>
        </div>
      </section>
`;

let context = null;

export async function showDetails(ctx) {
   context = ctx;
    const id = ctx.params.id;  
    const data = await dataService.getSingleCharacter(id);
    const isOwner = userHelper.getUserID() === data._ownerId;
    if(isOwner === undefined){
        isOwner = false;
    }
    ctx.render(detailsTemp(data, isOwner));   

}

async function delChar(e) {
    const confirmed = confirm(
        "Are you sure you want to delete this Hero?"
    );

    if (confirmed) {
        const id = context.params.id;
        await dataService.deleteCharacter(id);;

        context.goTo("/dashboard");
    }
  
}