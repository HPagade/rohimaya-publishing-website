# 📚 Learning Path: React Fundamentals

*Educational Guide - Learn by building Rohimaya Publishing*

---

## What is React?

**React** is a JavaScript library for building user interfaces (UIs). Think of it as a toolkit for creating websites that update and change without reloading the page.

### Why React?
- ✅ **Component-based**: Build once, reuse everywhere
- ✅ **Fast**: Only updates what changed
- ✅ **Popular**: Huge community, tons of resources
- ✅ **Powers**: Facebook, Instagram, Netflix, Airbnb

---

## 🎯 Core Concepts

### 1. Components

**What is a Component?**
A reusable piece of UI, like a LEGO block.

**Example:**
```javascript
// A simple button component
function Button({ text }) {
  return <button>{text}</button>;
}

// Use it:
<Button text="Click Me" />
<Button text="Submit" />
<Button text="Cancel" />
```

**In Your Project:**
- `Header.js` → The navigation bar (used on every page)
- `Footer.js` → The footer (used on every page)
- `BookCard.js` → A single book display (reused for each book)

**Exercise:**
1. Open `src/components/layout/Header.js`
2. Find the `<header>` tag
3. See how it returns HTML-like code (JSX)
4. This one component is used on EVERY page!

---

### 2. JSX (JavaScript + XML)

**What is JSX?**
HTML-like syntax in JavaScript. It looks like HTML but has superpowers!

**Example:**
```javascript
// Regular HTML:
<h1>Hello</h1>

// JSX (can use JavaScript inside):
<h1>Hello, {userName}!</h1>
<h1>2 + 2 = {2 + 2}</h1>
<h1>{isLoggedIn ? 'Welcome back!' : 'Please login'}</h1>
```

**Rules:**
- Use `className` instead of `class`
- Use `onClick` instead of `onclick`
- Close all tags: `<img />` not `<img>`
- Use `{ }` for JavaScript expressions

**In Your Project:**
Look at `src/pages/HomePage.js` line 47:
```javascript
<span className="highlight-phoenix">Stories</span>
```
- `className` sets CSS class
- The word "Stories" is displayed
- CSS makes it colored

**Exercise:**
1. Open `src/pages/HomePage.js`
2. Find line 49: `Where Stories Meet Magic`
3. Change it to: `Where {5 + 5} Stories Meet Magic`
4. Save and see "Where 10 Stories Meet Magic"!

---

### 3. Props (Properties)

**What are Props?**
Data passed to a component, like function arguments.

**Example:**
```javascript
// Define component that accepts props
function Greeting({ name, age }) {
  return <h1>Hello {name}, you are {age} years old!</h1>;
}

// Use it with different data
<Greeting name="Hannah" age={25} />
<Greeting name="Prasad" age={30} />
```

**In Your Project:**
Look at `src/components/layout/Header.js` line 43:
```javascript
<Link to="/" className="nav-link">Home</Link>
```
- `to="/"` is a prop (tells Link where to go)
- `className="nav-link"` is a prop (CSS styling)
- "Home" is children (special prop)

**Exercise:**
Create a simple component:
```javascript
// In src/components/ui/Badge.js
function Badge({ text, color }) {
  return (
    <span style={{
      background: color,
      padding: '5px 10px',
      borderRadius: '5px',
      color: 'white'
    }}>
      {text}
    </span>
  );
}

// Use it:
<Badge text="New!" color="red" />
<Badge text="Sale" color="green" />
```

---

### 4. State

**What is State?**
Data that can CHANGE over time. When state changes, React re-renders the component.

**Example:**
```javascript
import { useState } from 'react';

function Counter() {
  // count = current value
  // setCount = function to change it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}
```

**How it works:**
1. Initial state is `0`
2. User clicks button
3. `setCount(1)` is called
4. React re-renders with new count
5. User sees "Count: 1"

**In Your Project:**
Look at `src/components/layout/Header.js` line 20:
```javascript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```
- `mobileMenuOpen` tracks if menu is open (true/false)
- `setMobileMenuOpen` changes it
- When changed, menu appears/disappears

**Exercise:**
1. Open browser dev tools (F12)
2. Click the mobile menu button (☰)
3. See state change from `false` to `true`
4. Menu appears!

---

### 5. Events

**What are Events?**
User interactions: clicks, typing, hovering, etc.

**Example:**
```javascript
function MyButton() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

**Common Events:**
- `onClick` → Mouse click
- `onChange` → Input value changed
- `onSubmit` → Form submitted
- `onMouseEnter` → Mouse hover

**In Your Project:**
Look at `src/pages/HomePage.js` line 26:
```javascript
const handleEmailSignup = async (e) => {
  e.preventDefault(); // Stop page reload
  console.log('Email submitted:', email);
  setSignupStatus('success');
};
```

Then line 90:
```javascript
<form onSubmit={handleEmailSignup}>
```

**Exercise:**
Add a click counter:
```javascript
const [clicks, setClicks] = useState(0);

<button onClick={() => setClicks(clicks + 1)}>
  Clicked {clicks} times
</button>
```

---

### 6. Conditional Rendering

**What is it?**
Show different things based on conditions.

**Example:**
```javascript
function Welcome({ isLoggedIn }) {
  // Method 1: if/else
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }

  // Method 2: ternary operator
  return <h1>{isLoggedIn ? 'Welcome back!' : 'Please log in'}</h1>;

  // Method 3: && operator (show only if true)
  return (
    <div>
      {isLoggedIn && <h1>Welcome back!</h1>}
    </div>
  );
}
```

**In Your Project:**
Look at `src/components/layout/Header.js` line 62:
```javascript
{mobileMenuOpen && (
  <nav className="nav-mobile">
    ...
  </nav>
)}
```
- Menu only shows when `mobileMenuOpen` is `true`
- When `false`, nothing renders

**Exercise:**
1. Add state: `const [showSecret, setShowSecret] = useState(false);`
2. Add button: `<button onClick={() => setShowSecret(!showSecret)}>Toggle</button>`
3. Add conditional: `{showSecret && <p>Secret message!</p>}`

---

### 7. Lists & Keys

**What are Keys?**
Unique IDs for list items so React knows which changed.

**Example:**
```javascript
const books = [
  { id: 1, title: 'Book One' },
  { id: 2, title: 'Book Two' },
  { id: 3, title: 'Book Three' }
];

function BookList() {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}
```

**In Your Project:**
Look at `src/pages/BooksPage.js` line 36:
```javascript
{bookCategories.map((category, index) => (
  <div key={index} className="category-section">
    ...
  </div>
))}
```

**Exercise:**
Create a todo list:
```javascript
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build app' }
]);

return (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.text}</li>
    ))}
  </ul>
);
```

---

## 🎓 Learning Order

### Week 1: Basics
1. ✅ Components (what they are)
2. ✅ JSX (HTML in JavaScript)
3. ✅ Props (passing data)

### Week 2: Interactivity
4. ✅ State (data that changes)
5. ✅ Events (user interactions)
6. ✅ Conditional rendering

### Week 3: Advanced
7. ✅ Lists & Keys
8. ✅ useEffect (side effects)
9. ✅ Custom hooks

### Week 4: Real World
10. ✅ API calls
11. ✅ Forms
12. ✅ Routing

---

## 📖 Practice Exercises

### Exercise 1: Counter App
Build a simple counter:
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Exercise 2: Toggle Component
```javascript
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON 💡' : 'OFF'}
    </button>
  );
}
```

### Exercise 3: Form Input
```javascript
function NameForm() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

---

## 🔍 Where to Learn More

### Official Resources:
- **React Docs**: https://react.dev/learn
- **React Tutorial**: https://react.dev/learn/tutorial-tic-tac-toe

### Video Courses:
- **freeCodeCamp** (YouTube - FREE)
- **Scrimba** - Interactive lessons
- **Codecademy** - Learn by doing

### Practice:
- Build small apps
- Modify this project
- Read our code comments

---

## 💡 Tips for Learning

1. **Type the code yourself** - Don't just copy/paste
2. **Break things** - Change code and see what happens
3. **Use console.log()** - See what values are
4. **Read error messages** - They tell you what's wrong
5. **Google everything** - Everyone does this!

---

## 🎯 Your Learning Goals (30 Days)

### Week 1:
- [ ] Understand components
- [ ] Use props
- [ ] Write JSX

### Week 2:
- [ ] Use useState
- [ ] Handle events
- [ ] Conditional rendering

### Week 3:
- [ ] Map through lists
- [ ] Make API calls
- [ ] Handle forms

### Week 4:
- [ ] Build a small feature
- [ ] Deploy something
- [ ] Feel confident!

---

**Next:** Read `02-CSS-STYLING.md` to learn how to make it look beautiful!
