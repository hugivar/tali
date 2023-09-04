import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Box, Button, Text } from "@chakra-ui/react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TodoistApi } from "@doist/todoist-api-typescript";
const useServiceStore = create()(
  devtools(
    persist(
      (set) => ({
        service: "todoist",
        setService: (serviceName) => set(() => ({ service: serviceName }))
      }),
      {
        name: "service-storage"
      }
    )
  )
);
const addService = (service) => {
  console.log("TaskList line:8", service);
  if (service === "todoist") {
    console.log("TaskList line:36");
    const response = fetch("/oauth/authorize");
    console.log("TaskList line:46", response);
  }
};
const refreshService = (service, callback) => {
  if (service === "todoist") {
    const api = new TodoistApi("68b6dea696daa0ce2ca1f15833d306379036ade5");
    api.getTasks().then(() => {
      callback();
    }).catch((error) => console.log(error));
  }
};
const TaskList = () => {
  const { service } = useServiceStore();
  console.log("TaskList line:105");
  const hanndleRefresh = () => {
  };
  return /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsxs(Button, { onClick: () => addService(service), children: [
      "Add ",
      service
    ] }),
    /* @__PURE__ */ jsx(Button, { onClick: () => refreshService(service, hanndleRefresh), children: "Refresh" }),
    /* @__PURE__ */ jsx(Text, { children: "Task List" }),
    /* @__PURE__ */ jsxs(Text, { children: [
      "Service: ",
      service
    ] })
  ] });
};
const handle = () => {
  fetch("/oauth/authorize");
};
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("nav", {}),
    /* @__PURE__ */ jsx("div", { children: "here" }),
    /* @__PURE__ */ jsx("button", { onClick: handle, children: "click" }),
    /* @__PURE__ */ jsx(TaskList, {})
  ] });
}
function render(url, context) {
  return ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, context, children: /* @__PURE__ */ jsx(App, {}) })
  );
}
export {
  render
};
