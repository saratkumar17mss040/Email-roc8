import { emailApiClient } from "../emailApiClient";
import { useState, createContext, useEffect, useContext } from "react";

const EmailContext = createContext(null);
EmailContext.displayName = "EmailContext";

// Data modeling

/* 

emailFilter: "unread" | "read" | "favorite" | "all"

*/

/*
  emailList: [{
    id: "1",
    from: {
    email: "bounced@flipkart.com",
    name: "bounced"
    },
    date: 1582729505000,
    subject: "Lorem Ipsum",
    short_description: "Vestibulum sit amet ipsum",
    filters: { isRead: false, isFavorite: false },
    }
  ]
*/

export function EmailContextProvider({ children }) {
  const [emailList, setEmailList] = useState(() => {
    const storedFilters = sessionStorage.getItem("emailList");
    return storedFilters ? JSON.parse(storedFilters) : [];
  });

  // it could be unread | read | favorite
  const [emailFilter, setEmailFilter] = useState(() => {
    const emailFilter = sessionStorage.getItem("emailFilter");
    return emailFilter ? JSON.parse(emailFilter) : "unread";
  });

  const [isEmailLoading, setEmailLoading] = useState(null);
  const [totalEmailItems, setTotalEmailItems] = useState(() => {
    const storedTotalEmailItems = sessionStorage.getItem("totalEmailItems");
    return storedTotalEmailItems ? parseInt(storedTotalEmailItems) : 0;
  });
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(() => {
    const storedPageNo = sessionStorage.getItem("pageNo");
    return storedPageNo ? parseInt(storedPageNo) : 1;
  });

  // effect to fetch emails based on pageNo changes
  // session storage across different pages wont work. limitation
  useEffect(() => {
    async function fetchEmailWrapper() {
      setEmailLoading(true);
      setError(null);
      // same page no. so emailList is already in session storage - wont change
      if (
        sessionStorage.getItem("emailList") &&
        pageNo === +sessionStorage.getItem("pageNo")
      ) {
        const emailList = JSON.parse(sessionStorage.getItem("emailList"));
        const totalEmailItems = +sessionStorage.getItem("totalEmailItems");
        setTotalEmailItems(totalEmailItems);
        setEmailList(emailList);
        setEmailLoading(false);
        return;
      }
      // different page no. so fetch again for new page data
      try {
        const data = await emailApiClient.fetchAllEmails(pageNo);
        const emailList = data.list.map((emailItem) => ({
          ...emailItem,
          filters: {
            isRead: false,
            isFavorite: false,
          },
        }));
        setTotalEmailItems(data.total);
        setEmailList(emailList);
        sessionStorage.setItem("emailList", JSON.stringify(emailList));
        sessionStorage.setItem("emailFilter", null);
        sessionStorage.setItem("totalEmailItems", data.total.toString());
        sessionStorage.setItem("pageNo", pageNo.toString());
        sessionStorage.setItem("clickedEmail", null);
      } catch (error) {
        setError(`Failed to fetch emails: ${error.message}`);
      } finally {
        setEmailLoading(false);
      }
    }

    fetchEmailWrapper();
  }, [pageNo]);

  // effect for emailList synchronization with session storage
  useEffect(() => {
    sessionStorage.setItem("emailList", JSON.stringify(emailList));
  }, [emailList]);

  // effect for emailFilter synchronization with session storage only when not null
  useEffect(() => {
    if (emailFilter) {
      sessionStorage.setItem("emailFilter", JSON.stringify(emailFilter));
    }
  }, [emailFilter]);

  return (
    <EmailContext.Provider
      value={{
        emailList,
        setEmailList,
        emailFilter,
        setEmailFilter,
        isEmailLoading,
        error,
        totalEmailItems,
        pageNo,
        setPageNo,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export function useEmailContext() {
  if (!EmailContext) {
    throw new Error(
      "useEmailContext must be used within a EmailContextProvider"
    );
  }
  return useContext(EmailContext);
}
