# Functionalities 

## Authentication 
The app is secured using JWT authentication. 
You can change the session time duration by overriding the `SessionTime` param in the config 
* Note that the app automatically relog yourself before your token expire 

![Login form](/doc/screenshots/login_form.png)

![Login success](/doc/screenshots/login_success.png)

## LeftPanel 
You can easy access your containers or images from the left panel

## Containers 
### list
You can search a container by typing in the field on the right of the orange bar.
You can also sort your containers by : name, id, image, creation date, state

![Containers list](/doc/screenshots/containers.png)

### details 
In this view you have access to the configuration, the last 20 lines of logs, the real time console and the top of your container. 
The icons on the right of the toolbar are separated in sections : 

 1. Logs (download all logs, can take time if huge logs)
 2. Edit, Remove your container 
 3. State manipulation (start, stop, restart, pause, unpause) 
 4. Image, navigate to the parent image

![Containers down](/doc/screenshots/container_down.png)

![Containers up](/doc/screenshots/container_up.png)

### create 
#You can create a container for a stored image (note that you can pull an image from the hub, see the [images pull section](#pull) ! ) 

![Containers create](/doc/screenshots/container_create.png)

## Images 
### list
You can search an image by typing in the field on the right of the blue bar.
You can also sort your images by : name, repository, id, creation date

![Images](/doc/screenshots/images.png)

### details
You can see the default configuration of the image and see the hub informations (if existing)
The icons on the right of the toolbar are separated in sections : 

 1. Remove the image 
 2. See the hub page of the image (is on the hub)

![Image details](/doc/screenshots/image_details.png)

### pull
You can pull an image from the hub 

![Image pull](/doc/screenshots/image_pull.png)

![Image pull tag](/doc/screenshots/image_pull_tag.png)