((win, doc, _) => {
  const emailInputHandler = () => {
    const emailInputNode: HTMLInputElement | null = doc.querySelector(
      ".input[type='email']"
    );
    if (emailInputNode)
      emailInputNode.addEventListener("input", (e) =>
        emailInputNode.setAttribute(
          "value",
          (e.target as HTMLInputElement).value
        )
      );
  };

  if (location.pathname === "/login") emailInputHandler();

  if (location.pathname === "/register") {
    emailInputHandler();
    const passwords: string[] = Array.from(
      doc.querySelectorAll(
        ".input[type='password']"
      ) as NodeListOf<HTMLInputElement>
    ).map((node) => node.value);

    const arePasswordMatching = passwords[0] === passwords[1];

    if (!arePasswordMatching) {
      // show error
    }
  }
})(window, document);
