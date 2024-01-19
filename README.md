#  [Friday Talk] CRUD app with React meta-framework

## Infrastructure

Check the README file in `infra` directory.

## Strapi

If previous configured do run: `npm run start` in `refine-strapi-system-news` directory

You can log in to http://localhost:1337 with `jz@gmail.com/Strapi20242024`

### Configuration

> Show this steps for other collection

1. Create Strapi project: `npx create-strapi-app@latest refine-strapi-system-news --quickstart`
2. Create a new collection type with Display name `System news update` this will create:

   * API ID singular: system-news-update
   * API ID plural: system-news-updates

3. Create 2 fields for this collection: `Title` which is a Short text and `Description` which is Rich text (blocks)
4. Save
5. In Content manager Create new content, save and publish.
6. We want to open the API so go to `Settings -> USERS&PERMISSIONS PLUGIN -> Roles`, find Public role and in Permission for `System-news-update` select all 
7. Save

If you visit `http://localhost:1337/api/system-news-updates` your previous Content, that you created above, should be displayed.

# API 

Check README file in `api` directory

# Refine UI

Flow: 

1. First tutorial 
2. Basic App
3. Basic Auth
4. Adding keycloak
5. 2 data providers 
6. Custom update action

Notes:

* Be sure that the infra containers are running and are configured.
* Don't forget to run strapi from refine-strapi-system-news directory
* Run ui with: `npm run dev`