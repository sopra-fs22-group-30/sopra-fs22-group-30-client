/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.intro = null;
    this.birthday = null;
    this.creationDate = null;
    this.gender = null;
    Object.assign(this, data);
  }
}
export default User;
