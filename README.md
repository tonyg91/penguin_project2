# Project 2
#### Anime Watch List

## Project Summary

Tell me what are your build and what tools are you using?

I will be building a anime watchlist app where users can add anime tht might want to watch later into an index page of their own. Each show page will have a video preview of the anime using bootstrap an image and a brief desciption. As well as buttons to add to watch list and remove from watch list. I would also like to add authentication so users can have there own watch list. 
## Models

List here any models in your app and their properties

##### The schema and model I will use .
title: String
img: url
video: url
description:

## Route Table

List your routes in a table

| url | method | action |
|-----|--------|--------|
| /anime | get |  (index)|
| /anime/:id | get | (show)|
| /anime/new| get | (new) form to add new anime with video and image links |
| /anime | post |(create) req to body after submission|
| /anime/:id/edit | get | (edit) from to edit the anime show page|
| /anime/:id | put |(update) redirect to /anime after update |
| /anime/:id | delete | (delete) redirect to /anime after delete |

## User Stories
The user will be able to go the site and on the home screen it will have photos and name on the anime, as well as a carousel under the title that flips through anime images in a time increment. There wiill also be two links one link will be to add an anime to there watchlist and the other to navigate to a index page of there saved shows. When the user clicks on an image it will take them to a show page the user will see a breif description of the anime as well as a video preview. And have a button to add to there watchlist and a back to home page button.

## Challenges

- Day One I struggled with Creating a new route for a seperate page for users to add shows to their watch list. Still Googling a Solution.

-Day Two I struggled with adding videos to the show pages for preview I was getting a Youtube refused to connect error. After a few hours of trying to figure out what was wrong I asked for help and It turns out I just had bad seed data.


## List of Technologies
-HTML
-CSS
-Bootstrap
-Express
-MongoDB

## Sources 
Fonts - https://www.tutorialbrain.com/css_tutorial/css_font_family_list/ 

Descriptions- 
Barnes&Noble- https://www.barnesandnoble.com/b/books/graphic-novels-comics/manga/_/N-29Z8q8Zucc 

Crunchyroll -https://www.crunchyroll.com/ 
