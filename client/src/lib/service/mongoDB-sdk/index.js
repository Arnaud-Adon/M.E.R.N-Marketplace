import * as Realm from "realm-web";

const REALM_APP_ID = process.env.REALM_APP_ID;
export const realmApp = new Realm.App({ id: REALM_APP_ID });
