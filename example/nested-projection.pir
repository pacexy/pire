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
