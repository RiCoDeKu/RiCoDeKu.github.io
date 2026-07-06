const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const setYear = () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = getYear();
  }
};

const getSlideLoadingText = () => {
  return document.documentElement.lang === "en"
    ? "Loading slide..."
    : "スライドを読み込み中...";
};

const createSlideLoadingIndicator = () => {
  const loadingIndicator = document.createElement("div");
  const spinner = document.createElement("span");
  const loadingText = document.createElement("span");

  loadingIndicator.className = "slide-loading";
  loadingIndicator.setAttribute("role", "status");
  loadingIndicator.setAttribute("aria-live", "polite");

  spinner.className = "slide-spinner";
  spinner.setAttribute("aria-hidden", "true");

  loadingText.className = "text-sm font-semibold";
  loadingText.textContent = getSlideLoadingText();

  loadingIndicator.append(spinner, loadingText);

  return loadingIndicator;
};

const setupSlideLoaders = () => {
  const minimumLoadingTime = 700;

  document.querySelectorAll("[data-slide-src]").forEach((slideFrame) => {
    const loadButton = slideFrame.querySelector(".js-load-slide");

    if (!loadButton) {
      return;
    }

    loadButton.addEventListener(
      "click",
      () => {
        const loadingIndicator = createSlideLoadingIndicator();
        const iframe = document.createElement("iframe");
        const loadingStartTime = Date.now();

        iframe.title = slideFrame.dataset.slideTitle || "PowerPoint Viewer";
        iframe.className = "slide-iframe is-hidden rounded-lg";
        iframe.setAttribute("aria-hidden", "true");
        iframe.setAttribute("frameborder", "0");

        if (slideFrame.dataset.slideSandbox) {
          iframe.setAttribute("sandbox", slideFrame.dataset.slideSandbox);
        }

        iframe.addEventListener(
          "load",
          () => {
            const elapsedTime = Date.now() - loadingStartTime;
            const remainingTime = Math.max(
              0,
              minimumLoadingTime - elapsedTime,
            );

            window.setTimeout(() => {
              slideFrame.classList.add("is-loaded");
              slideFrame.classList.remove("slide-placeholder");
              iframe.classList.remove("is-hidden");
              iframe.removeAttribute("aria-hidden");
              loadingIndicator.remove();
            }, remainingTime);
          },
          { once: true },
        );

        slideFrame.replaceChildren(loadingIndicator);

        window.setTimeout(() => {
          slideFrame.append(iframe);
          iframe.src = slideFrame.dataset.slideSrc;
        }, 50);
      },
      { once: true },
    );
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  setupSlideLoaders();
});
