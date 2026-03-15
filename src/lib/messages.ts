const FUNNY_MESSAGES = [
  "Congratulations! Your suffering begins now.",
  "{name} has been chosen by the ancient spirits of DevOps.",
  "{name} will spend the next sprint saying 'it works on my machine' to everyone.",
  "Pour one out for {name}, our brave release manager.",
  "The release pipeline has claimed another victim: {name}.",
  "{name}'s weekend plans have been cancelled. All of them.",
  "Congratulations {name}! You are now on Slack at 2am.",
  "Please update your LinkedIn title to 'Blame Target, {name}'.",
  "The team voted unanimously. {name} looks suspiciously relieved... wait, no they don't.",
  "May {name}'s logs be readable and errors be caught.",
  "{name} asked for more responsibility. They did not ask for this.",
  "{name} has been selected by a totally fair and unbiased algorithm.",
  "🎺 A moment of silence for {name}'s free time.",
  "{name}: the hero we needed, not the one we deserved.",
  "Deploy responsibly, {name}. The team is watching.",
  "{name} rolled a 1 on their saving throw vs. release management.",
  "The dice have spoken. {name} is doomed. We mean, chosen!",
  "Rumour has it {name} once fixed a production bug in 3 minutes. Now they must pay.",
  "{name} — bravery is doing it anyway, even when you know what 'it' is.",
  "Fun fact: {name} now owns all incidents until next week.",
  "{name} has been voluntold for greatness.",
  "Witnesses report seeing {name} confidently clicking 'Deploy to Prod'.",
  "{name}: the chosen one of CI/CD lore.",
  "Fate has spoken. So has the RNG. Both agree on {name}.",
  "If anything breaks this week, {name} knows who to call (themselves).",
  "{name} enters the deploy chair with the grace of someone who has no choice.",
  "The pipeline is yours, {name}. Use it wisely. Or don't. We'll see.",
  "Scientists confirm: the probability of {name} escaping was 0.",
  "In loving memory of {name}'s peaceful week that could have been.",
  "{name} will be providing a retrospective. The topic: why.",
];

export function getRandomMessage(name: string): string {
  const template = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
  return template.replace(/{name}/g, name);
}
