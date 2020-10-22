# pire
**Pi**pe **Re**quest - make your request like a pipeline.

## Example
> You can write the template string in `pir` file.

If you don't want a input, use `void`.

```typescript
import { parsep } from 'pire'

const pir = parsep(`
void -> riot.league {
  summonerName
  leaguePoints
  rank
  wins
  losses
} -> summonerId

summonerId -> riot.summoner {
  profileIconId
  summonerLevel
  extra {
    matchIds
  }
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
    collectionPath: [ 'riot', 'league' ],
    query: { summonerName: 1, leaguePoints: 1, rank: 1, wins: 1, losses: 1 },
    outputFieldPath: [ 'summonerId' ]
  },
  {
    inputFieldPath: [ 'summonerId' ],
    collectionPath: [ 'riot', 'summoner' ],
    query: { profileIconId: 1, summonerLevel: 1, extra: { matchIds: 1 } },
    outputFieldPath: [ 'extra', 'playerId' ]
  },
  {
    inputFieldPath: [ 'ID' ],
    collectionPath: [ 'leaguepedia', 'player' ],
    query: { ID: 1, Team: 1, Role: 1 }
  }
]
```
