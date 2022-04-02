/**
 * Party model
 */
class Party {
    constructor(data = {}) {
        this.partyId = null;
        this.partyName = null;
        this.partyHolderId = null;
        this.partyIntro = null;
        this.partyIngredients = null;
        this.place = null;
        this.time = null;
        this.creationTime = null;
        this.recipeUsed = null;
        this.partyAttendentsList = null;
        this.partyAttendentsNum = null;

        Object.assign(this, data);
    }
}
export default Party;