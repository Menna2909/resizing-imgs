
# Resize Images Pro

This project resizes images into any needed size and return them in .jpg format for free!

## Dependancies 
- node.js (include npm)
```
check if you have them
$ node -v
$ npm -v
```
- Git (to clone the project locally)
## Features

- Totally Free
- Offers wide range of sized for resizing 
- FAst, easy, compatable
- Accpet jpg, jpeg, png files and conert them into jpg


## Usage/Examples

An example of using the server separated locally :

```javascript
fetch("http://localhost:3000/uploads", {
  method : 'POST',
  body: {
    'imgInput' : ,
    'width' : 'number',
    'height' : 'number'
  }
});
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/Menna2909/resizing-imgs
```

Go to the project directory

```bash
  cd resizing-imgs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev:watch
```


## Running Tests

To run tests, run the following command
- The server should be running to run the test !
In a seperate terminal rather than the one for the server, run :

```bash
  npm test
```

