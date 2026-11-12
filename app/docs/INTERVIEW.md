1-Where will each of the three requests run?

> Since the info that is being fetched Not all of them requires activity from the user. The Employee profile and and Recent posts are automatically run from the client side. Since they don't require any thing from the user. Whether it clicks or any thing like that. Whereas the Explore all post part. Since it requires a click from the user. The request will run on the client side.

After implementation, I learned that the employee profile and recent posts preview requests run on the server because they are fetched inside Server Components. The Explore all posts request runs in the browser because it starts in the Client Component’s button click handler.

2-What should remain visible while the server posts preview loads?

> There should be an indicator to the user that the posts are being loaded. Like a loading spinner or even text. After the fetch is complete, Another indicator must be shown to the user, Whether it was successful or not. If yes, Posts will be displayed. If no. A message should be shown to the user that fetch has failed.

While the server posts preview loads, the employee profile and client posts controls remain visible. Only the preview shows its loading fallback. I verified this by observing the page during the intentional two-second delay.

3-Will wrapping a click-handler fetch in Suspense automatically display its fallback?

> No it wouldn't. Suspense fallback functions displays only when the whole component is not rendered yet.

Suspense does not automatically show its fallback for a fetch started inside a click handler. In my client component, I use the loading state to show “Loading posts…” while the request runs. The server preview uses Suspense because its async component waits for data during rendering.

4-I'm not sure to be honest. But i would say yes. Since it's an error

My initial prediction was incorrect. An HTTP 503 response does not automatically make fetch throw. I must check response.ok and throw an error myself. In my code, this check throws an ApiError containing the HTTP status, which the catch block handles.

5-Where does each request execute, and what evidence helped you verify that?
The employee profile and recent posts preview requests run on the server, where their Server Components fetch the data. The Explore all posts request runs in the browser after clicking Load posts. I verified the client request by clicking the button and seeing posts?userId=1 appear in the browser’s Network panel.

6-Why use server fetching for the profile and client fetching for the button?
The profile should load when the page opens, so I fetch it in a Server Component. The full posts list should load only when the user clicks Load posts, so I fetch it in the Client Component’s click handler. This also lets me show loading feedback and allow retry.

7-What activates the preview’s Suspense fallback, and why doesn’t the button request activate it?
The preview’s async Server Component waits during rendering, so Suspense shows its fallback until the component is ready. The button starts its request inside a click handler, which does not automatically activate Suspense. I use React state to show loading feedback for that request.

8-What would change if you moved the preview’s Suspense boundary around the whole dashboard?
The loading fallback could replace the whole dashboard while the preview waits. Keeping the boundary around only the preview lets the profile and client controls remain visible while the recent posts load.

9-How does your custom error class help, and what does super(message) do?
My ApiError class stores the error message and HTTP status. In the catch block, I use instanceof ApiError to recognize HTTP errors and access their status. Calling super(message) passes the message to the built-in Error class.

10-What is the difference between an HTTP failure, a network failure, and an empty result?
An HTTP failure means the server returned an unsuccessful status, such as 503. I detect it by checking response.ok. A network failure means the request could not complete, so fetch rejects. An empty result is a successful response containing no posts, so I display “No posts found” instead of an error.

11-What happens if employee ID 1 is changed to 2 in all three sections?
I would expect the profile to show employee 2’s details, and both posts sections to show posts belonging to employee 2. The loading and error handling should work the same way. This is a prediction; I have not tested the change.

12-Which decision did you personally verify rather than accepting without checking?
I personally tested the HTTP error and Empty scenarios. At first, they did not work because the real fetch request replaced the simulated responses. After fixing the branching, I tested them again and confirmed that the error scenario showed the 503 message and the empty scenario showed “No posts found.”
