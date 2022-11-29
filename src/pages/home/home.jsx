import React from "react";
import "./home.scss";

const home = () => {
  return (
    <section className="home dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <img
            src="./images/Logo.png"
            alt="Main-Logo"
            className="logo"
          />
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            <em>
              Art & logos are registered trademarks of Square Enix Holdings..
            </em>
          </p>
        </div>
        <article className="p-6 home-post rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-5 text-gray-500">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
              <svg
                className="mr-1 w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clip-rule="evenodd"
                ></path>
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
              </svg>
              Author Post
            </span>
            <span className="text-sm">11/14/22</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a
              href="https://github.com/angreenwood/ffxiv-hunt-tool"
              target="_blank"
              rel="noreferrer"
            >
              Open source project GitHub
            </a>
          </h2>
          <p className="font-light text-gray-500 dark:text-gray-400">
            This project features:
          </p>
          <ul className="project-list">
            <li>React</li>
            <li>Google Firebase</li>
            <li>XIVAPI</li>
            <li>Devextreme</li>
            <li>Tailwind</li>
            <li>Netlify</li>
          </ul>
          <p className="mt-1 mb-5 font-light text-gray-500 dark:text-gray-400">
            This project is heavily influenced by the amazing folks over at{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://ffxivhunt.com/"
              className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              FFXIVhunt
            </a>{" "}
            & also utilizes XIVAPI. I intended for this to strictly be a
            representation of React / Firebase capabilities. Images found on the
            Hunt page including Monsters & Maps were constructed by FFXIVhunt
            and should be duly credited.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                className="w-7 h-7 rounded-full"
                src="./images/httpLovecraft.jpg"
                alt="Author Avatar"
              />
              <span className="font-medium dark:text-white">
                Http Lovecraft - Exodus
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default home;
