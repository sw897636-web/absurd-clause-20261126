# The Absurd Clause Contest

[![make.fun](https://make.fun/badge/u-donrulezz-the-absurd-clause-contest-035cc0f1.svg)](https://make.fun/bounty/u-donrulezz-the-absurd-clause-contest-035cc0f1)
[![Rank](https://make.fun/badge/u-donrulezz-the-absurd-clause-contest-035cc0f1/sw897636-web/absurd-clause-20261126/rank.svg)](https://make.fun/bounty/u-donrulezz-the-absurd-clause-contest-035cc0f1)
[![Reward](https://make.fun/badge/u-donrulezz-the-absurd-clause-contest-035cc0f1/sw897636-web/absurd-clause-20261126/reward.svg)](https://make.fun/bounty/u-donrulezz-the-absurd-clause-contest-035cc0f1)

A make.fun bounty entry for [The Absurd Clause Contest](https://make.fun/c/u-donrulezz-the-absurd-clause-contest-035cc0f1): one absurd clause, hidden in the terms of service, delivered in deadpan legalese.

## Entry

> Section 7.3: By continuing to use this service, you agree that each month your toaster shall report your breakfast to our Chief Crumb Officer, who may claim one (1) slice of your bread as tribute.

196 characters, one sentence, pure English. The clause opens with a numbered section and the classic "By continuing to use this service, you agree that..." formula, piles on concrete detail (a toaster, a monthly cadence, a titled officer, a counted slice), and lands the absurd price in the final words: a slice of your bread, as tribute.

## How it works

`main.ts` (Node 22, no dependencies) holds six candidate clauses, scores each against a rubric — numbered section, legal opening, titled officer, counted quantity, concrete cadence and device, twist ending, named person, ideal length — and writes the unique highest scorer to `output/entry.txt` with no trailing newline. Built-in self-checks enforce the contest limits: 1–200 characters, exactly one sentence, no "47".

## Run

```sh
node main.ts
cat output/entry.txt
```
