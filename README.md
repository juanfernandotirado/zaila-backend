Zaila Platform was born with the intention of bringing more people to museums making the experience of visiting an exhibition more interactive, informative and efficient. 

Back End Technologies
MySQL - Database
Free and open-source database software that aligns with the tech goals of Zaila‘s architecture. MySQL provides an easy and low-maintenance setup for our fixed schema with high performance. Because of the well-defined structure of the data in which Zaila works, MySQL gives us the advantage of facilitating interaction and ensuring the robustness of the relationships among this data. Finally, the high transaction rate that this relational database offers was key to ensure the performance with potentially large quantities of users interacting at the same time with Zaila.

Node.js & Express
One of the main features of Zaila is to enhance the user experience for museum visitors through improving interactivity. That means that Zaila’s backend has to be swift and handle a high volume of users but providing low latency. Node.js is very efficient with real-time applications as it facilitates handling multiple client requests by allowing data sync between the client and server to happen very fast. Another key aspect of Zaila's backend running on Node.js is, since we provide secure user interaction with OAuth 2.0 between the client and the server, having a quick and reliable validation flow is vital, so with our frontend and backend running both in JavaScript, we could solve this concern easily.

AWS S3 - Cloud Storage
Zaila takes advantage of the IaaS provided by AWS to handle a heavy volume data traffic implementing its cloud storage solution Amazon S3. Due to the very sensitive to copyright nature of the data handled by Zaila and the high volume of this data, mainly in the form of big multi-media files, we decided to integrate Amazon S3 which provides a highly-scalable, secured and low-latency data storage from the cloud.

OAuth 2.0 - Security
Security is a priority for Zaila. A big component of our app is based on tracking user's interaction and activities, so it is mandatory for users to register first before using Zaila on their mobile devices. Even when the information required for the signup process is not highly sensitive, Zaila takes the privacy and security of its users seriously and implements OAuth 2.0 authentication protocol, so users can choose if they want to signup and login using Google credentials or using Zaila's credentials. Also, for the museums to manage Zaila's dashboard and access the service, they have to register too. OAuth allows Zaila to protect and manage the access to its resources through Zaila’s API.
