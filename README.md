# Smart Classroom [🔗](https://hackthisfall2-0.vercel.app/)

### Built With
- fingerpose 
- react
- tensorflowjs

### Screenshots 
![gallery](https://user-images.githubusercontent.com/71957674/165063673-fcf7f69f-cf9f-442c-b727-822e4b7269b2.jpg)

![gallery (1)](https://user-images.githubusercontent.com/71957674/165063717-19d1c45b-8561-4abd-bb5e-9cf7cc678233.jpg)


### Inspiration
As we all know about the Covid scenario , there was a shift towards this online platforms like Zoom , microsoft teams , Gmeet , etc .

I found that students with disability like someone is blind , disability to speak they found it difficult in learning during this online classes shift , they might they have a assistance to guide them in online-class but all it was a with a no solution so I decided to create this app.

### What it does
It take the handpose of the disable student through TensorFlowjs handpose model and convert it into a gesture i.e. victory , thumpsup .

If the student shows victory gesture , that works as toggle for mic off - on If the student shows a thumps gesture , that works as toggle for video off-on.

### How we built it
I used react for frontend , used tensorflowjs handpose model to detect the hand , used a fingerpose package to convert those handpose landmarks to a gesture .

### Challenges we ran into
Learning about in-browser machine learning module i.e Tensorflow js was a great task , but those Readme.md provide by tensorflow was beneficial for us , Drawing the neural network on the canvas in realtime through the landmarks data , took us a lot of time

### Accomplishments that we're proud of
I proud of that it can be used by blind people , they wouldnot be requiring any full-time assistance anymore for the classes . This kind of solution to problems can be purposed to these online meeting platform for disable student.

### What we learned
During building this we learnt about tensorflowjs , learning about those landmarks in the hand and showing that in realtime through canvas was a great learning . Also learnt about , how those landmarks are used to detect a gestures was Fun for us & new to us .

### What's next for Smart Classroom
I wanted to create a free video chat platform , where I can take this to next step to make it more reliable that it can be used by 100s & 1000s of disable students .

### Built With
- fingerpose
- react
- tensorflowjs
