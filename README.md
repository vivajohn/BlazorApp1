# BlazorApp1
This is my first experience with Blazor. I implemented part of my Audio Flashcards Angular app as a Blazor app. The recording page is used for adding and deleting prompt-response recordings. The playback page plays the recordings and reschedules the prompts client-side.

The application can switch in real-time between using an Azure Cosmos or a Cloud Firestore database, both of which are no-sql. The Cloud Firestore database is accessed via a REST API written in Python. The Python API is hosted on Google Cloud and was uploaded using Docker.

The application is [hosted here](https://blazoraudioflashcards.azurewebsites.net) on Azure.


![Image of recording page](https://github.com/vivajohn/BlazorApp1/blob/master/Screenshots/blazor_playback.png)


![Image of recording page](https://github.com/vivajohn/BlazorApp1/blob/master/Screenshots/blazor_record.png)
