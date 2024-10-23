Components:

Pages/
Email.tsx

Components/
EmailBody.tsx
EmailFilter.tsx
EmailsList.tsx
EmailCardView.tsx
Pagination.tsx

Context/
EmailFilterContext.tsx
useEmailFilter.tsx

High level data plan:

Context will have Filter data
EmailList will have email data

Data Modeling:

we will have everything in the context itself

mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false

// Using js-cookie library for easier cookie management
Cookies.set('filter_preferences', JSON.stringify(filterPreferences), { expires: 7 });
Cookies.set('date_range', JSON.stringify(dateRange), { expires: 7 });

// Retrieving and applying preferences
const savedFilters = Cookies.get('filter_preferences') ? JSON.parse(Cookies.get('filter_preferences')) : null;
const savedDateRange = Cookies.get('date_range') ? JSON.parse(Cookies.get('date_range')) : null;

// Clear preferences
Cookies.remove('filter_preferences');
Cookies.remove('date_range');

