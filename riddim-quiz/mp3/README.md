# MP3 loops

Add one short `.mp3` clip for each riddim in this directory. The filename must match the riddim ID below. Mode 1 plays a random track once and loads another track when its name is revealed. Mode 2 plays the selected loop on repeat until the user submits a guess or excludes the riddim. Mode 3 previews tracks as the user identifies a numbered sound. No audio files are included.

| Riddim                     | Filename                       |
| -------------------------- | ------------------------------ |
| Train To Skaville          | `train-to-skaville.mp3`        |
| African Beat               | `african-beat.mp3`             |
| Answer (Never Let Go)      | `answer-never-let-go.mp3`      |
| Bam Bam                    | `bam-bam.mp3`                  |
| Bobby Babylon              | `bobby-babylon.mp3`            |
| Cuss Cuss                  | `cuss-cuss.mp3`                |
| Don’t Haffi Dread          | `dont-haffi-dread.mp3`         |
| Far East                   | `far-east.mp3`                 |
| Full Up (Pass The Kouchie) | `full-up-pass-the-kouchie.mp3` |
| Heavenless                 | `heavenless.mp3`               |
| Hi Fashion                 | `hi-fashion.mp3`               |
| Hot Milk.                  | `hot-milk.mp3`                 |
| I’m Still In Love          | `im-still-in-love.mp3`         |
| Lecturer (Diseases)        | `lecturer-diseases.mp3`        |
| Love Bump.                 | `love-bump.mp3`                |
| Money in My Pocket         | `money-in-my-pocket.mp3`       |
| Night Nurse                | `night-nurse.mp3`              |
| Promised Land              | `promised-land.mp3`            |
| Real Rock                  | `real-rock.mp3`                |
| Revolution                 | `revolution.mp3`               |
| Run Run                    | `run-run.mp3`                  |
| Satta Massagana            | `satta-massagana.mp3`          |
| Shank I Sheck.             | `shank-i-sheck.mp3`.           |
| Stalag (Stalag 17)         | `stalag.mp3`         |
| Undying Love.              | `undying-love.mp3`             |

To add another riddim, add an `{ id, name }` entry in alphabetical order to the `riddims` array in `app.js`, then add the matching `.mp3` file here. Progress is saved in this browser's local storage. A riddim leaves future questions after three correct guesses in a row, or can be excluded with the “I know this one” button. Use “Reset mastered riddims” to restore excluded riddims.
