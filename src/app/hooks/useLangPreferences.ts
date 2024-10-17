import { useState, useEffect } from "react";

export const useLangPreferences = () => {
	const [sourceLang, setSourceLang] = useState<string>("en");
	const [targetLang, setTargetLang] = useState<string>("es");

	useEffect(() => {
		const storedSourceLang = localStorage.getItem("sourceLang");
		const storedTargetLang = localStorage.getItem("targetLang");

		if (storedSourceLang) setSourceLang(storedSourceLang);

		if (storedTargetLang) setTargetLang(storedTargetLang);
	}, []);

	const saveSourceLang = (lang: string) => {
		setSourceLang(lang);
		localStorage.setItem("sourceLang", lang);
	};

	const saveTargetLang = (lang: string) => {
		setTargetLang(lang);
		localStorage.setItem("targetLang", lang);
	};

	return {
		sourceLang,
		targetLang,
		saveSourceLang,
		saveTargetLang,
	};
};
