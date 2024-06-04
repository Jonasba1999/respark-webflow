import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper/bundle";
import "swiper/css";

// Custom last project item to view mouseenter
const appendMoreProjects = function () {
	const moreProjectsItem = document.querySelector(".projects_view-more-card");
	if (!moreProjectsItem) return;
	const projectsGrid = document.querySelector(".projects_grid");

	projectsGrid.appendChild(moreProjectsItem);
};

const testimonialSwiperFunction = function () {
	const swiperTarget = document.querySelector(".testimonial-swiper");
	if (!swiperTarget) return;

	const testimonialSwiper = new Swiper(swiperTarget, {
		// Optional parameters
		loop: false,
		slidesPerView: 1,
		speed: 1000,
		spaceBetween: 32,
		autoHeight: false,
		pagination: {
			el: ".swiper-page-buble",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-btn-next",
			prevEl: ".swiper-btn-prev",
		},
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 768px (tablet)
			768: {
				slidesPerView: 2,
			},
			// when window width is >= 992px (laptop)
			992: {
				slidesPerView: 2.5,
			},
		},
	});
};

// We are open for work CTA green light animation
const greenLightAnimation = function () {
	const ctaGreenLight = document.querySelector(".cta_green-light");
	if (ctaGreenLight) {
		const tlGreenLight = gsap.timeline({
			scrollTrigger: {
				trigger: ctaGreenLight,
				start: "top 90%",
				toggleActions: "play none none reset",
			},
		});

		tlGreenLight.to(ctaGreenLight, {
			backgroundColor: "#22F500",
			boxShadow: "0px 0px 15px 2px rgba(34, 245, 0, 1)", // Target box shadow value
			duration: 0.1,
		});
	}
};

// Email copy
const copyEmail = function () {
	const emailCopyButtons = document.querySelectorAll(".email-copy_button");
	if (emailCopyButtons.length === 0) return;

	const copyFunction = async function (email) {
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			console.log("Unable to copy");
		}
	};

	const toggleCopyAnimation = function (button) {
		if (button.classList.contains("is-copied")) return;
		button.classList.toggle("is-copied");
		setTimeout(() => {
			button.classList.toggle("is-copied");
		}, 2000);
	};

	emailCopyButtons.forEach((button) => {
		const emailText = button.querySelector(".email-copy_email-text");
		const copiedText = button.querySelector(".email-copy_copied-text");

		button.addEventListener("click", () => {
			copyFunction(emailText.textContent);
			toggleCopyAnimation(button);
		});
	});
};

const faqAccordion = function () {
	const faqWraps = document.querySelectorAll(".faq_element");
	if (faqWraps.length === 0) return;

	faqWraps.forEach((faqWrap) => {
		const faqItems = faqWrap.querySelectorAll(".faq_item");
		let activeTl = null;
		let activeItem = null;

		// Here create animation and add click listener
		faqItems.forEach((faqItem, index) => {
			const faqAnswerWrap = faqItem.querySelector(".faq_answer-wrap");
			const faqIconWrap = faqItem.querySelector(".faq_icon-wrap");
			const faqHorizontalIcon = faqItem.querySelector(".faq_icon-stripe-h");
			const faqVerticalIcon = faqItem.querySelector(".faq_icon-stripe-v");

			const tl = gsap.timeline({
				paused: true,
				onComplete: () => {
					ScrollTrigger.refresh();
				},
			});
			tl.fromTo(
				faqAnswerWrap,
				{
					y: "32px",
					height: 0,
					autoAlpha: 0,
				},
				{
					y: "0px",
					height: "auto",
					autoAlpha: 1,
					duration: 0.5,
					ease: "power3.inOut",
				}
			);
			tl.to(
				faqIconWrap,
				{
					duration: 0.5,
					rotation: 180,
					ease: "power3.inOut",
				},
				"<"
			);
			tl.to(
				faqVerticalIcon,
				{
					opacity: 0,
					duration: 0.5,
				},
				"<"
			);

			faqItem.addEventListener("click", () => toggleFaqItem(faqItem, tl));

			// Function to toggle faq items
			const toggleFaqItem = function (faqItem, tl) {
				if (activeTl && activeTl !== tl) {
					activeTl.reverse();
					activeItem.classList.remove("is-open");
				}

				faqItem.classList.toggle("is-open");
				faqItem.classList.contains("is-open") ? tl.play() : tl.reverse();

				// Update currently active items
				activeTl = tl;
				activeItem = faqItem;
			};

			if (index === 0) toggleFaqItem(faqItem, tl);
		});
	});
};

// .body background scroll paralax effect
const bodyBackgroundParalax = function () {
	gsap.to(".body", {
		backgroundPosition: "0% 5%",
		ease: "none",
		scrollTrigger: {
			trigger: document.body,
			start: "top top",
			end: "bottom bottom",
			scrub: 0,
		},
	});
};

// Contact us slider form
const contactPageSlider = function () {
	const contactSwiperTarget = document.querySelector(".contact-swiper");
	if (!contactSwiperTarget) return;
	const contactSwiper = new Swiper(contactSwiperTarget, {
		loop: false,
		speed: 0,
		slidesPerView: 1,
	});

	if (document.querySelector(".contact-swiper")) {
		animateSlideElements();
	}

	const nextButton = document.querySelectorAll(".contact-swiper-btn-next");
	const prevButton = document.querySelectorAll(".contact-swiper-btn-prev");

	if (nextButton) {
		nextButton.forEach((button) =>
			button.addEventListener("click", function () {
				reverseSlideElements(function () {
					contactSwiper.slideNext();
					animateSlideElements(); // Start animation after slide change
				});
			})
		);
	}

	if (prevButton) {
		prevButton.forEach((button) =>
			button.addEventListener("click", function () {
				reverseSlideElements(function () {
					contactSwiper.slidePrev();
					animateSlideElements(); // Start animation after slide change
				});
			})
		);
	}

	function animateSlideElements() {
		const currentSlide = contactSwiper.slides[contactSwiper.realIndex];
		const animateElements = currentSlide.querySelectorAll(".animate-up");
		gsap.fromTo(
			animateElements,
			{
				y: 30,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.3,
				stagger: 0.2,
				ease: "power1.out",
			}
		);
	}

	function reverseSlideElements(onComplete) {
		gsap.to(document.querySelectorAll(".contact-swiper .animate-up"), {
			y: 30,
			opacity: 0,
			duration: 0.2,
			ease: "power1.in",
			onComplete: onComplete, // Call onComplete callback when animation is finished
		});
	}

	// Form success lottie play
	$(".swiper-wrapper").submit(() => {
		setTimeout(() => {
			$(".form-success-trigger").click();
		}, 1000);
	});
};

// Animate project image
const projectFullWidthImageAnimation = function () {
	const fullWidthImage = document.querySelector(".project_big-image");
	if (!fullWidthImage) return;

	let mm = gsap.matchMedia();
	mm.add("(min-width: 992px)", () => {
		gsap.to(fullWidthImage, {
			backgroundPosition: "100% 0%",
			ease: "none",
			scrollTrigger: {
				trigger: fullWidthImage,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
		});
	});
};

// Project image reveal
const projectFinalImageAnimation = function () {
	const revealOverlay = document.querySelector(".about-project_image-overlay");
	if (!revealOverlay) return;

	const revealImage = document.querySelector(".final-result_image");
	let tlImageReveal = gsap.timeline({
		scrollTrigger: {
			trigger: revealOverlay,
			start: "top 70%",
			toggleActions: "play none none none",
		},
	});

	tlImageReveal.to(revealOverlay, {
		xPercent: 100,
		ease: "power3.inOut",
		duration: 1.5,
	});

	tlImageReveal.from(
		revealImage,
		{
			scale: 1.5,
			ease: "power3.out",
			duration: 2.5,
		},
		"<"
	);
};

const pageTransitionEffect = function () {
	// Selecting all transition items
	const transitionWrap = document.querySelector(".transition_wrap");
	const transitionItem = document.querySelectorAll(".transition_item");
	const transitionLogo = document.querySelector(".transition_logo");

	// Transition OUT
	const tlTransitionOut = gsap.timeline();

	// 1. Transition out logo
	tlTransitionOut.to(transitionLogo, {
		duration: 0.6,
		y: "100%",
		ease: "power2.inOut",
	});

	// 2. Transition out column items
	tlTransitionOut.to(
		transitionItem,
		{
			duration: 0.6,
			y: "-100%",
			ease: "power2.inOut",
			stagger: 0.1,
			onComplete: function () {
				// Set display: none after the animation
				transitionWrap.style.display = "none";
			},
		},
		"0.3"
	);

	// Transition IN
	const allLinks = document.querySelectorAll("a");
	allLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			if (link.classList.contains("no-transition")) return;
			e.preventDefault();
			const href = link.getAttribute("href");
			transitionIn(href);
		});
	});

	const transitionIn = function (href) {
		const tlTransitionIn = gsap.timeline();
		// 1. Set wraper display: flex
		transitionWrap.style.display = "flex";

		// 2. Transition in column items
		tlTransitionIn.to(transitionItem, {
			y: "0%",
			duration: 0.6,
			stagger: 0.1,
			ease: "power2.inOut",
		});

		// 3. Transition in logo
		tlTransitionIn.to(
			transitionLogo,
			{
				y: "0%",
				duration: 0.6,
				ease: "power2.inOut",
				onComplete: function () {
					window.location.href = href;
				},
			},
			"0.4"
		);
	};
};

// Custom cursor
const customCursor = function () {
	const cursor = document.querySelector(".cursor");
	if (!cursor) return;

	const links = document.querySelectorAll("a, .cursor-animate");

	const cursorScaleTl = gsap.timeline({ paused: true });
	cursorScaleTl.to(cursor, {
		scale: 0.5,
		duration: 0.3,
		ease: "power1.inOut",
	});

	window.addEventListener("mousemove", (e) => {
		moveCustomCursor(e);
	});

	function moveCustomCursor(e) {
		const { target, x, y } = e;
		gsap.to(cursor, {
			x: x - 17,
			y: y - 15,
			ease: "power3.out",
			duration: 0.5,
		});
	}

	function scaleCursorDown() {
		cursorScaleTl.restart();
	}

	function resetCursorSize() {
		cursorScaleTl.reverse();
	}

	links.forEach((link) => {
		link.addEventListener("mouseenter", scaleCursorDown);
		link.addEventListener("mouseleave", resetCursorSize);
	});
};

const homeHeroAnimation = function () {
	const animationTrack = document.querySelector(".home-hero_track");
	if (!animationTrack) return;
	const websiteWrap = document.querySelector(".home-hero_right-col");
	const websiteGrid = document.querySelector(".home-hero_website-grid");
	const leftCol = document.querySelector(".home-hero_website-col.is-left");
	const middleCol = document.querySelector(".home-hero_website-col.is-middle");
	const rightCol = document.querySelector(".home-hero_website-col.is-right");

	let mm = gsap.matchMedia();

	mm.add("(min-width: 992px)", () => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: animationTrack,
				start: "top top",
				end: "bottom bottom",
				scrub: 1.5,
			},
			ease: "expo.in",
		});

		tl.to(websiteWrap, {
			width: "100%",
			duration: 0.7,
		})
			.to(
				websiteGrid,
				{
					scale: 1,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					skewX: 0,
					skewY: 0,
					duration: 0.7,
				},
				"<"
			)
			.fromTo(
				[leftCol, rightCol],
				{
					y: "-20%",
				},
				{
					y: "20%",
					duration: 1,
					ease: "linear",
				},
				"<"
			)
			.fromTo(
				middleCol,
				{
					y: "20%",
				},
				{
					y: "-20%",
					duration: 1,
					ease: "linear",
				},
				"<"
			);
	});

	mm.add("(max-width: 991px)", () => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: animationTrack,
				start: "top top",
				end: "bottom top",
				scrub: 1,
			},
			ease: "linear",
		});

		tl.fromTo(
			[leftCol, rightCol],
			{
				x: "-50%",
			},
			{
				x: "0%",
			}
		);

		tl.fromTo(
			middleCol,
			{
				x: "50%",
			},
			{
				x: "0%",
			},
			"<"
		);
	});
};

let lenis;
const smoothScroll = function () {
	// LENIS SMOOTH SCROLL
	lenis = new Lenis({
		lerp: 0.1,
		wheelMultiplier: 1,
		// smoothTouch: false,
		gestureOrientation: "vertical",
		normalizeWheel: false,
		smoothTouch: false,
		ease: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
	});

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
};

const menuAnimation = function () {
	const hamburgerWrap = document.querySelector(".nav_hamburger-wrap");
	const navMenu = document.querySelector(".nav_menu");
	if (!hamburgerWrap || !navMenu) return;

	const navLinks = document.querySelectorAll(".nav_link-wrap");
	const navLinkText = document.querySelectorAll(".nav_menu-link-text");
	const navMenuWrap = document.querySelectorAll(".nav_menu-wrap");
	const circleText = document.querySelector(".nav_circle-text");
	gsap.to(circleText, {
		rotation: 360,
		duration: 20,
		repeat: -1,
		ease: "linear",
	});

	const masterTl = gsap.timeline({ paused: true });
	const menuTl = gsap.timeline({ paused: true });
	const linksTl = gsap.timeline({ paused: true });

	// 1.  Set .nav_menu-wrap to display: block
	menuTl
		.set(navMenuWrap, {
			display: "block",
		})
		.to([navMenu, navMenuWrap], {
			y: "0%",
			duration: 1,
			ease: "power2.inOut",
		});

	linksTl.fromTo(
		navLinkText,
		{
			y: "100%",
		},
		{
			y: "0%",
			stagger: 0.1,
			duration: 1.2,
			ease: "power2.out",
		},
		"<+0.4"
	);

	const toggleMenu = function () {
		hamburgerWrap.classList.toggle("is-active");

		if (hamburgerWrap.classList.contains("is-active")) {
			lenis.stop();
			menuTl.restart();
			linksTl.restart();
		} else {
			lenis.start();
			menuTl.reverse();
		}
	};

	hamburgerWrap.addEventListener("click", toggleMenu);

	navLinks.forEach((link) => {
		link.addEventListener("mouseover", () => {
			navLinks.forEach((sibling) => {
				if (sibling !== link) {
					gsap.to(sibling, { color: "#565656", duration: 0.3 });
				}
			});
		});
		link.addEventListener("mouseout", () => {
			navLinks.forEach((sibling) => {
				gsap.to(sibling, { color: "white", duration: 0.3 });
			});
		});
	});
};

const imageParallaxAnimation = function () {
	const parallaxWrap = document.querySelectorAll(".parallax-wrap");
	if (parallaxWrap.length === 0) return;
	console.log(parallaxWrap);

	parallaxWrap.forEach((wrap) => {
		const parallaxImage = wrap.querySelector(".parallax-image");
		console.log(parallaxImage);
		gsap.to(parallaxImage, {
			scrollTrigger: {
				trigger: wrap,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
			top: "0%",
			ease: "none",
		});
	});
};

// Initializing all animations when DOM is loaded
const initFunctions = function () {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.refresh();
	appendMoreProjects();
	testimonialSwiperFunction();
	greenLightAnimation();
	copyEmail();
	faqAccordion();
	bodyBackgroundParalax();
	contactPageSlider();
	projectFullWidthImageAnimation();
	projectFinalImageAnimation();
	customCursor();
	smoothScroll();
	homeHeroAnimation();
	menuAnimation();
	pageTransitionEffect();
	imageParallaxAnimation();
};

document.addEventListener("DOMContentLoaded", initFunctions);
