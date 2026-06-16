In order to run the project:

1. Install dependencies:
Open terminal in the Quiz-Builder/backend folder and run npm install.
Open another terminal in the Quiz-Builder/frontend folder and run npm install.

2. Configure Environment Variables:
Create a .env file in the root of the backend folder with following contents:
PORT=3001
DATABASE_URL=./database.sqlite

Create a .env file in the root of the frontend folder with following contents:
VITE_API_BASE_URL=http://localhost:3001

3. Run backend and frontend:
Run npm run dev in terminal in the backend folder.
Without closing the first terminal, run npm run dev in second terminal in the frontend folder.

4. Access the app on http://localhost:5173/ in browser. 

To create sample quiz:

1. Press the Create Quiz button in upper-right corner of the app.
2. Enter the quiz title in the corresponding field.
3. Construct the question using the form below.
4. Use the Add Question button in the bottom and trash icons in question form to customise questions amount.
5. Once the quiz is ready, click Post Quiz button at below. You will be sent to the quizzes page where the new quiz can be seen.