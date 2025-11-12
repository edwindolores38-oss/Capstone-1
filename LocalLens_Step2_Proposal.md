# LocalLens – Community Event Finder
**Capstone Step 2: Project Proposal (Formal Report)**

## 1. Introduction
This document presents the formal project proposal for *LocalLens – Community Event Finder*, a web-based platform designed to connect residents with nearby community events. LocalLens will provide a centralized, user-friendly interface for discovering concerts, art shows, volunteer opportunities, and other local activities.

The purpose of this project is to encourage local engagement by simplifying event discovery. Users will be able to search, filter, and bookmark events while maintaining their privacy and data security.

---

## 2. Project Type and Focus
**Type:** Web application (responsive for desktop and mobile use)  
**Focus:** Full-stack development — integrating both frontend and backend components.  

The project’s frontend will provide a modern, responsive interface using **React.js**, while the backend will deliver a robust API built with **Node.js** and **MongoDB**.

---

## 3. Project Goals
- Develop a centralized hub for local event discovery.  
- Implement user accounts with authentication to save favorite events.  
- Allow search and filtering by category, city, and date range.  
- Maintain a clean, accessible, and intuitive interface.  
- Ensure data protection and compliance with privacy best practices.

---

## 4. Target Users
The application will primarily serve:  
- **Local residents** seeking events within their area.  
- **Students** searching for affordable and nearby activities.  
- **Families** looking for kid-friendly community events.  
- **Community organizers** who want their events to be discoverable.

**Example user stories:**
1. As a user, I want to find concerts or art shows within 10 miles of my city.  
2. As a parent, I want to find family-oriented events this weekend.  
3. As a registered user, I want to save and review my favorite events later.

---

## 5. Data Sources
For early development, LocalLens will use a **seeded dataset** of community events stored in MongoDB. This dataset will include fields such as title, description, location, date, category, and event source.

In future phases, the application will integrate **external event APIs** (e.g., Ticketmaster, Eventbrite, or City event feeds) to retrieve live data. Data will be normalized into a consistent structure to ensure reliable filtering and display.

---

## 6. Technology Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | React.js (with Tailwind CSS for styling) |
| **Backend** | Node.js + Express (API layer) |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JSON Web Tokens (JWT) and bcrypt for password hashing |
| **Hosting** | Render (backend) and Vercel (frontend) |
| **Version Control** | Git and GitHub |
| **Testing (future)** | Jest for backend; React Testing Library for frontend |

This stack ensures scalability, modern tooling, and compatibility with free-tier hosting solutions.

---

## 7. Database Schema (Planned)
Two main collections will be defined in MongoDB:

### **User**
| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique user ID |
| name | String | User’s name |
| email | String | Login email |
| passwordHash | String | Encrypted password |
| favorites | [String] | List of event IDs the user has saved |

### **Event**
| Field | Type | Description |
|--------|------|-------------|
| eventId | String | Unique event identifier |
| title | String | Event title |
| description | String | Brief summary |
| category | String | Category (music, art, sports, etc.) |
| startDate | Date | Event start date/time |
| venue | Object | Venue name, city, coordinates |
| source | String | Source of event (seed or API) |

A many-to-many relationship exists between Users and Events through the favorites feature.

---

## 8. Security and Privacy
- **Password Protection:** All passwords will be hashed using bcrypt before storage.  
- **Token Security:** Authentication will use JWT with expiration and secret key protection.  
- **PII Minimization:** Only necessary fields (name, email) will be stored.  
- **Environment Variables:** Sensitive keys and URIs will be stored in a `.env` file (excluded from version control).  
- **API Limits:** Rate limiting will be implemented in future steps to prevent abuse.

---

## 9. Anticipated Challenges
| Challenge | Impact | Mitigation |
|------------|---------|------------|
| Data inconsistency across APIs | Medium | Standardize field names and validation schemas |
| API rate limits | Medium | Implement caching or seed fallback |
| Map/geolocation accuracy | Low–Medium | Validate coordinates and allow manual updates |
| Security vulnerabilities | High | Follow OWASP standards and input validation |

---

## 10. Stretch Goals
If time permits, additional features will include:
- **Map Integration:** Interactive maps for event locations.  
- **Notifications:** Email or in-app alerts for new events.  
- **Social Sharing:** Share saved events via social media.  
- **Accessibility:** WCAG-compliant visual contrast and keyboard navigation.  

---

## 11. Timeline
| Phase | Step | Deliverable |
|--------|------|-------------|
| **Week 1–2** | Step 3 | Schema design, seed data creation |
| **Week 3–4** | Step 4 | Backend models, database testing |
| **Week 5–6** | Step 5 | API design, endpoint documentation |
| **Week 7–8** | Step 6 | UI build, integration, deployment |
| **Week 9** | Step 7 | Testing, final presentation |

---

## 12. Success Metrics
The project will be considered successful when:
- Users can register, log in, and view or save events without errors.  
- Search and filter return relevant results within 2 seconds.  
- The interface is mobile-responsive and visually accessible.  
- The app is deployed publicly and documented in GitHub.

---

## 13. Conclusion
LocalLens aims to make community discovery accessible, efficient, and secure. By combining user-centered design and reliable technologies, this project demonstrates the core principles of full-stack web development — from database modeling to user experience.

---

**Prepared by:** Edwin Dolores  
**Course:** Software Engineering Career Track Capstone  
**Date:** [Insert submission date]
