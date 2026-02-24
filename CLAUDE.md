# CLAUDE.md - Eventoo

## Project Overview

Eventoo is a React Native mobile application (iOS & Android) for event planning and social coordination. Users can create events, invite contacts, set dates/locations, manage checklists, contribute to group funds (cagnotte), and communicate via messaging. The app uses Facebook and Google social authentication alongside manual email/password registration.

The codebase is written primarily in **French** — component names, variable names, Redux action types, and UI strings are all in French.

## Tech Stack

- **Framework**: React Native 0.59.4 (class components, no hooks)
- **Language**: JavaScript with Flow type annotations (`@flow`)
- **State Management**: Redux 4.0 + react-redux 7.0
- **Navigation**: react-navigation 3.x (`createStackNavigator`, `createBottomTabNavigator`, `createAppContainer`)
- **Authentication**: react-native-fbsdk (Facebook), react-native-google-signin (Google), react-native-firebase
- **Payments**: tipsi-stripe 7.5 (Stripe integration)
- **Maps/Location**: react-native-maps, react-native-geolocation-service
- **Bundler**: Metro
- **Package Manager**: Yarn (yarn.lock present)
- **Backend**: Remote PHP API at `https://ilx1412.phpnet.org/testSQL.php` (all networking calls go through this single endpoint with `?action=` query parameter)
- **Backend dependency**: Stripe PHP SDK via Composer (`stripe/stripe-php ^6.34`)
- **Testing**: Jest with react-native preset

## Directory Structure

```
Eventoo/
├── App.js                  # Root component, wraps Navigation in Redux Provider
├── index.js                # App entry point (AppRegistry)
├── app.json                # App name config ("SocialNetworkAuth")
├── package.json            # Dependencies and scripts
├── composer.json            # PHP dependency (Stripe)
├── babel.config.js          # Babel config (metro-react-native-babel-preset)
├── metro.config.js          # Metro bundler configuration
├── .flowconfig              # Flow type checker configuration (v0.92)
├── .buckconfig              # Buck build config
├── Components/              # All React Native screen and UI components
│   ├── Inscription.js       # Landing/signup screen (Facebook, Google, manual)
│   ├── InscriptionForm.js   # Manual registration form
│   ├── Connexion.js         # Login screen
│   ├── Accueil.js           # Home screen (list of upcoming events)
│   ├── CestParti.js         # Event creation - step 1 (title, genre, details)
│   ├── Quand.js             # Event creation - step 2 (date/time)
│   ├── InviterLesPotos.js   # Event creation - step 3 (invite contacts)
│   ├── Location.js          # Event creation - location search
│   ├── LocationMap.js       # Map view for location selection
│   ├── Checklist.js         # Event checklist management
│   ├── Cagnotte.js          # Group fund/money pool
│   ├── JeValide.js          # Event validation/confirmation
│   ├── ResumeEvent.js       # Event summary view
│   ├── ResumeCagnotte.js    # Fund summary
│   ├── ResumeInvites.js     # Invitees summary
│   ├── ResumeChecklist.js   # Checklist summary
│   ├── Profil.js            # User profile screen
│   ├── ProfilEdition.js     # Profile editing
│   ├── Calendrier.js        # Calendar view
│   ├── Galerie.js           # Photo gallery
│   ├── Messagerie.js        # Messaging
│   ├── MessageInbox.js      # Message inbox
│   ├── CardForm.js          # Stripe payment card form
│   ├── InputAmountForm.js   # Payment amount input
│   ├── EventItem.js         # Event list item component
│   ├── GuessItem.js         # Guest list item
│   ├── ChecklistItem.js     # Checklist item component
│   ├── CircleThumbnail.js   # Circular profile thumbnail
│   ├── PotosItem.js         # Friend/contact list item
│   ├── CalendrierItem.js    # Calendar item
│   ├── CalendrierSelect.js  # Calendar selection
│   ├── potosData.js         # Local friends mock data
│   └── Reutilisable/        # Reusable UI components
│       └── Warning.js       # Warning icon component
├── Navigation/
│   └── Navigation.js        # All navigation configuration (tab + stack navigators)
├── Networking/
│   └── Profile.js           # All API calls (user CRUD, events, invites, checklist)
├── Store/
│   ├── configureStore.js    # Redux store setup (combineReducers)
│   └── Reducers/
│       ├── profileReducer.js  # User profile state (SET_CURRENT_USER)
│       └── eventReducer.js    # Event creation state (CESTPARTI, QUAND, ADD_INVITE, etc.)
├── Helpers/                 # Static/mock data files
│   ├── donneesEvent.js      # Sample event data
│   ├── InvitesData.js       # Sample invitees data
│   ├── potosData.js         # Sample friends data
│   ├── checklistData.js     # Sample checklist data
│   ├── contributorsData.js  # Sample contributors data
│   ├── galerieData.js       # Sample gallery data
│   └── Markers.js           # Map marker data
├── Assets/                  # Image assets (PNG, SVG, JPG)
├── __tests__/
│   └── App-test.js          # Basic app rendering test
├── filesBIS/                # Backup/alternate versions of files
│   ├── InscriptionFormBis.js
│   └── ProfileBis.js
├── android/                 # Android native project
├── ios/                     # iOS native project (Xcode)
└── vendor/                  # Composer vendor directory (Stripe PHP)
```

## Commands

### Development

```bash
# Install JS dependencies
yarn install

# Install PHP dependencies (for Stripe server-side)
composer install

# Start Metro bundler
yarn start
# or: npx react-native start

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios
```

### Testing

```bash
# Run Jest tests
yarn test
# or: npx jest
```

There is a single test file (`__tests__/App-test.js`) that verifies the App component renders without crashing.

## Architecture & Patterns

### Component Pattern
- All components are **ES6 class components** extending `React.Component` (no functional components or hooks)
- Components use `StyleSheet.create()` for inline styles defined at the bottom of each file
- Connected components use `react-redux` `connect()` with `mapStateToProps` at the bottom of the file
- Navigation options are set via `static navigationOptions`

### State Management (Redux)
- Single store with two reducers combined via `combineReducers`:
  - `profileReducer` — stores the current user object (`utilisateur`)
  - `eventReducer` — stores event creation state (title, address, date, invitees, checklist products)
- Redux action types are French uppercase strings: `SET_CURRENT_USER`, `CESTPARTI`, `QUAND`, `ADD_INVITE`, `REMOVE_INVITE`, `SET_ADRESSE`, `ADD_PRODUITS`
- Actions are dispatched directly via `this.props.dispatch(action)` (no action creator functions)

### Navigation Structure
The app uses a bottom tab navigator with 5 tabs:
1. **Accueil** (Home) — Stack: Inscription > InscriptionForm > Connexion > Accueil > ResumeEvent > sub-screens
2. **Calendrier** (Calendar) — Stack: Calendrier > CalendrierSelect
3. **CreerEvent** (Create Event) — Stack: CestParti > Quand > InviterLesPotos > Location > Cagnotte > Checklist > JeValide > etc.
4. **Profil** (Profile) — Stack: Profil > ProfilEdition
5. **Messagerie** (Messaging) — Stack: MessageInbox

The tab bar is hidden on the Inscription and Connexion screens.

### Networking
- All API calls are in `Networking/Profile.js` as standalone `async` exported functions
- All requests go to a single PHP backend endpoint (`https://ilx1412.phpnet.org/testSQL.php`) differentiated by the `?action=` query parameter
- Request pattern: `fetch()` with POST method, JSON headers, `JSON.stringify()` body
- Error handling: try/catch with `console.log(error)`

### API Actions
| Function | API Action | Purpose |
|----------|-----------|---------|
| `getUser` | `connexion` | Login/check user existence |
| `insertUser` | `insert_User` | Register new user |
| `updateUser` | `update_User` | Update user profile |
| `getContact` | `get_Contact` | Find contact by phone number |
| `getAllGenre` | `select_Genre` | Get event categories |
| `insertEvent` | `insert_Event` | Create new event |
| `getEvent` | `get_Event` | Get event by ID |
| `getMyEvents` | `get_MyEvents` | Get user's events |
| `insertInvite` | `insert_est_invite` | Add invitee to event |
| `deleteInvite` | `delete_est_invite` | Remove invitee |
| `getListInvites` | `get_listInvites` | Get event invitees |
| `insertOrganise` | `insert_Organizer` | Set event organizer |
| `insertChecklist` | `insert_Checklist` | Create event checklist |
| `insertProduit` | `insert_Produit` | Add product to checklist |
| `insertCompose` | `insert_Compose` | Link product to checklist |
| `getChecklist` | `get_Checklist` | Get event checklist |

## Coding Conventions

### Language
- **French is used throughout**: variable names, function names, comments, UI text, and Redux action types
- Examples: `utilisateur` (user), `courriel` (email), `prenom` (first name), `nom` (last name), `invites` (invitees), `cagnotte` (money pool), `adresse` (address)

### Naming
- Component files: PascalCase (`CestParti.js`, `InviterLesPotos.js`)
- Helper/data files: camelCase (`donneesEvent.js`, `checklistData.js`)
- Private methods: prefixed with underscore (`_utilisateurExiste`, `_capturerSaisiTitre`)
- State variables: camelCase French (`dateHeureDeb`, `nomLieu`, `listeProduits`)

### Style
- Styles defined via `StyleSheet.create()` at the bottom of each component file
- Black/white color scheme as the primary theme (black buttons with white text, rounded corners)
- `borderRadius: 30` or `borderRadius: 50` for rounded buttons/icons
- Standard margins: 25-30px horizontal margins on containers

### Imports
- React and React Native imports at the top
- Third-party library imports next
- Local component/networking/helper imports last
- Redux `connect` wraps the default export at the bottom of the file

## Important Notes

- The app name in native config is `SocialNetworkAuth` (the original project name before rebranding to Eventoo)
- The `filesBIS/` directory contains backup versions of files and should not be used in production
- The `Configure`, `Task`, `cd`, `keytool`, and `react-native` files in the root are empty (0 bytes) — likely artifacts
- The backend PHP API is hosted externally; there is no backend source code in this repository
- `node_modules/` is gitignored and must be installed via `yarn install`
- Flow (v0.92) is configured but may not be actively enforced
- The `vendor/` directory contains the Stripe PHP SDK installed via Composer
