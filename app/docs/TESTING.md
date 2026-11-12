# Testing

## Client demo scenarios

| Test       | Expected result                                                          | Actual result                                    | Result |
| ---------- | ------------------------------------------------------------------------ | ------------------------------------------------ | ------ |
| Success    | Clicking Load posts displays post titles and bodies from the API.        | Posts loaded and displayed correctly.            | Pass   |
| Slow       | Loading feedback appears during the two-second delay, followed by posts. | Loading feedback appeared, then posts loaded.    | Pass   |
| HTTP error | The simulated 503 response displays an error message and allows retry.   | The error message and Try again button appeared. | Pass   |
| Empty      | The simulated empty array displays “No posts found” without an error.    | “No posts found” appeared.                       | Pass   |

HTTP error and Empty use locally simulated responses. Success and Slow use the real JSONPlaceholder API.

## Remaining checks

| Test                 | Expected result                                                                                                                       | Actual result                                 | Result       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------ |
| Recovery             | After HTTP error, selecting Success and clicking Try again displays posts and clears the error.                                       | Not yet recorded.                             | Not verified |
| Duplicate clicks     | The button is disabled while loading, preventing additional requests.                                                                 | Not yet recorded.                             | Not verified |
| Client idle          | No client posts request starts before clicking Load posts.                                                                            | Not yet checked in the browser Network panel. | Not verified |
| Server profile       | Employee 1’s name, email, and company appear.                                                                                         | Not yet recorded.                             | Not verified |
| Server preview       | During a fresh reload, the preview shows its loading fallback while the page shell remains visible, then displays up to three titles. | Not yet recorded.                             | Not verified |
| Section independence | A client error leaves the server profile and preview visible and usable.                                                              | Not yet recorded.                             | Not verified |
| Usability            | Controls have labels and visible keyboard focus; the page is readable at around 360px wide.                                           | Not yet recorded.                             | Not verified |

## Screenshots

### Server preview loading

The screenshot below shows the server preview’s “Loading recent posts…” message while the employee profile and Load posts controls remain visible.

![Server preview loading](./screenshots/Screenshot%202026-11-12%20214517.png)

### Client demo scenarios

#### Success

Clicking Load posts displays post titles and bodies from the API.

![Client demo - Success](./screenshots/Screenshot%202026-11-12%20214041.png)

#### Slow

Loading feedback appears during the delay while the button is disabled.

![Client demo - Slow](./screenshots/Screenshot%202026-11-12%20214104.png)

#### HTTP error

Simulated 503 response displays an error message and allows retry via "Try again".

![Client demo - HTTP error](./screenshots/Screenshot%202026-11-12%20214120.png)

#### Empty

Simulated empty array displays "No posts found".

![Client demo - Empty](./screenshots/Screenshot%202026-11-12%20214133.png)

## Project checks

- `npm run build`: Compiled successfully without errors.

![Build check](./screenshots/Screenshot%202026-11-12%20214213.png)
