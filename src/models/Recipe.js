/**
 * Recipe model
 */
class Recipe {
    constructor(data = {}) {
        this.recipeId = null;
        this.recipeName = null;
        this.authorId = null;
        this.cuisine = null;
        this.cost = null;
        this.ingredient = null;
        this.pictureLocation = null;
        this.content = null;
        this.createdTime = null;
        this.likedUsersId = null;
        this.likesNum = null;

        Object.assign(this, data);
    }
}
export default Recipe;