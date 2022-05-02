# Introduction

This Node.js application implements the simple backend component for the [Farodyne](http://www.farodyne.com) homepage.

As the webpage is heavily centered around photography and digital editing, the information about these images is stored in a MongoDB database. The images are logically grouped into albums, which in turn are divided into a set of page sections. The backend code handles the interactions with the database, and exposes a simple REST API used to fetch the image information that the frontend module requires. The REST API is implemented using the Express framework.

To simplify the packaging and deployment of this application, the resulting code is packaged into a Docker image, which is built and pushed to a Docker registry using a workflow of Github Actions.
