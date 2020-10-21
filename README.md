# pire
**Pi**pe **Re**quest - make your request like a pipeline.

## Example
> You can write the template string in `pir` file
```typescript
import { parsep } from 'pire'

const pir = parsep(`
summonerName -> riot.league {
  summonerName
  leaguePoints
  rank
  wins
  losses
} -> summonerId

summonerId -> riot.summoner {
  profileIconId
  summonerLevel
} -> extra.playerId

ID -> leaguepedia.player {
  ID
  Team
  Role
}
`)
```

It will be parsed as:
```
[
  {
    inputFieldPath: [ 'summonerName' ],
    collectionPath: [ 'riot', 'league' ],
    query: {
      summonerName: undefined,
      leaguePoints: undefined,
      rank: undefined,
      wins: undefined,
      losses: undefined
    },
    outputFieldPath: [ 'summonerId' ]
  },
  {
    inputFieldPath: [ 'summonerId' ],
    collectionPath: [ 'riot', 'summoner' ],
    query: { profileIconId: undefined, summonerLevel: undefined },
    outputFieldPath: [ 'extra', 'playerId' ]
  },
  {
    inputFieldPath: [ 'ID' ],
    collectionPath: [ 'leaguepedia', 'player' ],
    query: { ID: undefined, Team: undefined, Role: undefined }
  }
]
```
