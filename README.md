# final-project-2
# PolyLingo - Details
Here are some of the key details for my app.

## App Architecture

The app follows a modular React architecture:

- `App.tsx` is the root of the app and contains global layout elements like the navigation bar and theme context, as well as a good routing structure.
- Pages are split into their own route components: `Home.tsx`, `About.tsx`, and `Games.tsx`.
- The games (only one functional) are dynamically loaded components using an openAI API, with the matching game being the primary implemented one so far.

NOTE! In order to run the app locally, you will need to make a .env file in your repo with the variables I submitted to the assignment on learning suite. There shouldn't be account issues... I hope. Let me know if there is, and I can send a video of it working on my end.

---

## State Management

- State is handled primarily using the React `useState` and `useEffect` hooks at the component level. I also use a context for all game information
- There is currently no external state library (like Redux or Zustand) — the project is small enough to keep state localized. In future versions, this may use session state, but the intent is to be able to use this whenever with no prior experience, so it likely will not ever use a db.
- Each mini-game manages its own internal state (like selected items, matches, attempts, etc.) in the context
- Theme toggling is managed via a simple context provider that switches Tailwind’s `dark` class on the root element.

---

## Routing

- The app uses React Router for client-side routing.
- There are three main routes: `/` (home), `/games`, and `/about`.
- Navigation is handled through a top nav bar that remains consistent across pages.

---

## Game Functionality: Matching Game

The matching game is implemented as follows:

1. The user selects the settings for the game (language, difficulty, etc.)
2. A call is made to openAI to get the words and the translations into a list. On render, the list is shuffled and split into two columns.
3. Users click one item from each column to attempt a match.
4. Correct matches are visually indicated, and incorrect ones are reset.
5. State updates based on user actions, and the game ends when all pairs are found or time runs out.

There is no backend or session storage here.

---

## Styling and Layout

- Tailwind CSS is used, but I had problems implementing it with postcss, so I had to change my styles to be more basic. However, the styling adapts responsively to different screen sizes and themes
- Each page and component primarily uses Tailwind’s flex utilities for layout.

---

## Incomplete or Placeholder Areas

- Only the matching game is fully implemented; other game modes like flashcards and sentence builders are not functional yet.
- No session storage is happening yet due to limited testability 

---

## AI Usage

Here is how I used AI (primarily Claude) in this project
- Styling: When converting old styles, claude helped me fix them to follow tailwind conventions and configurations
- Context: The game state / context was more difficult than anticipated. I was also cautious here because my API costs me money, so I wanted to ensure unnecessary calls were avoided. Claude helped me figure out how to break the different pieces into different files and helped with more difficult rendering logic (memo, reducer)
- Themes: Claude helped me figure out how to do theming efficiently for styling
- I made a couple other notes for where AI was useful for me

---

## Final Notes

- This project was really fun and I enjoyed it! I will likely integrate it with my personal project later
- The api had some trial and error, so unfortunately I didn't get to the other games. But I have the ideas for both and some startup code if you're interested!

If you have any questions please reach out! Thanks for a great semester as always!!!

