import '@styles/globals.css';
import Nav from '@components/Navbar';
import Provider from '@components/Provider';
export const metadata = {
title: "Prompt Genius",
description: "Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lamg="en">
        <body>
          <Provider>
    <div className="main">
        <div className="gradiennt"></div>
    </div>
    <main className="app">
        <Nav />
        {children}
    </main>
    </Provider>
    </body>
    </html>
  )
}

export default RootLayout