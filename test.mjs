import parse from 'de-noun-parser';

const wikitext = `{{also|apfel|Äpfel}}\n==German==\n{{wikipedia|dab=Apfel|lang=de}}\n\n===Alternative forms===\n* {{alter|de|Appel||colloquial; northern and central Germany}}\n\n===Etymology===\nFrom {{inh|de|gmh|apfel}}, from {{inh|de|goh|apful}}, from {{inh|de|gmw-pro|*applu}}, from {{inh|de|gem-pro|*aplaz}} (compare {{cog|nl|appel}}, {{cog|fy|apel}}, {{cog|en|apple}}), from {{der|de|ine-pro|*h₂ébōl}}.\n\n===Pronunciation===\n* {{IPA|de|/ˈapfəl/|[ˈʔapfəl]|[ˈʔapfl̩]|[ˈʔapɸəl]|[ˈʔapɸl̩]}}\n* {{audio|de|De-Apfel.ogg|audio}}\n\n===Noun===\n{{de-noun|m|Apfels|Äpfel|Äpfelchen|dim2=Äpfelein|dim3=Äpflein}}\n\n# [[apple]] (fruit)\n\n====Declension====\n{{de-decl-noun-m|s|pl=Äpfel}}\n\n====Derived terms====\n{{der4|de\n|apfelgrün\n|apfelig\n|Apfelbaum\n|Apfelessig\n|Apfelgarten\n|Apfelkuchen\n|Apfelplantage\n|Apfelsaft\n|Apfelschale\n|Apfelscheibe\n|Apfelschiffchen\n|Apfelstückchen\n|Apfeltorte\n|Apfelwein\n|Apfelwiese\n|Bratapfel\n|Goldapfel\n|Gelbapfel\n|Granatapfel\n|Holzapfel\n|Pferdeapfel\n|Reichsapfel\n|Rotapfel\n|Zankapfel\n|veräppeln\n|ein Apfel und ein Ei\n|der Apfel fällt nicht weit vom Stamm\n|in den sauren Apfel beißen\n|Apfelmus\n|Apfelmark\n|Apfelschorle\n}}\n\n===Further reading===\n* {{R:Duden}}\n* {{R:DWDS}}\n* {{R:Kluge 1891}}\n\n{{C|de|Fruits}}`;
console.log(parse(wikitext));