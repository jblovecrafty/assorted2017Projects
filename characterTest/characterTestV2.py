from random import *
import math
import json

dialogData = '''{
"greetingStart": {
    "npcText": "Good Morning Captain",
    "playerResponses": [
      "niceGreeting",
      "insaneGreeting",
      "neutralGreeting"
      ],
      "npcResponses": {
          "niceGreeting": {
            "nextDialog": [
                {"range": [-1,1], "dialogKey": "greetingReplyCharm"}
            ]
          },
          "insaneGreeting": {
            "nextDialog": [
                {"range": [-1,0], "dialogKey": "greetingReplyMadness1"},
                {"range": [0,1], "dialogKey": "greetingReplyMadness2"}
            ]
          },
          "neutralGreeting": {
            "nextDialog": [
                {"range": [-1,1], "dialogKey": "greetingReplyNeutral"}
            ]
          }
        }
  },
  "greetingReplyCharm": {
    "npcText": "Thank You, Captain",
    "playerResponses": [],
    "npcResponses": null
  }
}'''

playerData = '''
{
  "niceGreeting": {
    "isTruth": false,
      "text": "Good morning, my favorite ship",
      "skillUsed": "charm",
      "topics": []
  },
  "insaneGreeting": {
      "isTruth": false,
      "text": "Jump us into a black hole",
      "skillUsed": "madness",
      "topics": []
  },
  "neutralGreeting": {
      "isTruth": true,
      "text": "Thank you.",
      "skillUsed": "",
      "topics": []
  }
}'''

dialogData = json.loads(dialogData)
playerData = json.loads(playerData)

#python npc test
#https://simple.wikipedia.org/wiki/List_of_emotions (using Robert Plutchik's theory)
class Player:
    lying = 0
    intimidation = 0
    charm = 0
    humor = 0
    flattery = 0
    seduction = 0
    pity = 0
    empathy = 0
    guilt = 0
    madness = 0

    def __init__(self, lying, intimidation, charm, humor, flattery, seduction, pity, empathy, guilt, madness):
        self.lying = lying
        self.intimidation = intimidation
        self.charm = charm
        self.humor = humor
        self.flattery = flattery
        self.seduction = seduction
        self.pity = pity
        self.empathy = empathy
        self.guilt = guilt
        self.madness = madness

class Character:
    #how good the character is at sensing one of the following manipulations
    lying = 0
    intimidation = 0
    charm = 0
    humor = 0
    flattery = 0
    seduction = 0
    pity = 0
    empathy = 0
    guilt = 0
    madness = 0

    # an array of CharacterThoughts important to the npc
    characterAnimus = []

    def __init__(self, lying, intimidation, charm, humor, flattery, seduction, pity, empathy, guilt, madness, characterAnimus):
        self.lying = lying
        self.intimidation = intimidation
        self.charm = charm
        self.humor = humor
        self.flattery = flattery
        self.seduction = seduction
        self.pity = pity
        self.empathy = empathy
        self.guilt = guilt
        self.madness = madness
        self.characterAnimus = characterAnimus

class CharacterThought:
    emotionalImpact = 0
    #Topics are keyword that will trigger a this thought
    topics = []

    def __init__(self, emotionalImpact, topics):
      self.emotionalImpact = emotionalImpact
      self.topics = topics

class DialogManager:
    playerCharacter = None
    character = None
    dialogData = None
    playerData = None
    currentNode = None

    def __init__(self, player, character, dialogData, playerData, currentNode):
        self.playerCharacter = player
        self.character = character
        self.dialogData = dialogData
        self.playerData = playerData
        self.currentNode = currentNode

    #handle movement to the next node
    def nextNode(self, currentNode, playerResponse, playerSkillCheckValue):
        if(currentNode['npcResponses'][playerResponse]['nextDialog'] is not None and currentNode['npcResponses'][playerResponse]['nextDialog']):
            for response in currentNode['npcResponses'][playerResponse]['nextDialog']:
                if(playerSkillCheckValue >= response['range'][0] and playerSkillCheckValue < response['range'][1]):
                    nextNode = response['dialogKey']
                    print(nextNode)
                    self.currentNode = self.dialogData[nextNode]

    # helper function to make sure we constrain successes to 1 max and failure to -1 min
    def constrainMinMax(self,value):
        minN = -1
        maxN = 1
        value = max(minN, value)
        value = min(maxN, value)

        return value

    '''
    Contest between player and npc.
    Both perform a skill check
    Subtract player skill check from npc skill check to get final skill check value
    use topics to boost/harm npcs skill check
    '''
    def playerSkillCheck(self, player, playerSkill, dialogTopic, character):
        topicSkillModifier = 0
        
        if(dialogTopic != None and dialogTopic):
            for thought in character.characterAnimus:
                if dialogTopic in thought.topics:
                    topicSkillModifier = thought.emotionalImpact
                    print("topicSkillModifier")
                    print(topicSkillModifier)


        playerRoll = round(random(), 2)
        print("Player Roll")
        print(playerRoll)
        playerSkillCheck = (getattr(player, playerSkill) + topicSkillModifier) - playerRoll
        playerSkillCheck = self.constrainMinMax(playerSkillCheck)
        print("playerSkillCheck")
        print(playerSkillCheck)

        characterRoll = round(random(), 2)
        print("Character Roll")
        print(characterRoll)
        characterSkillCheck = getattr(character, playerSkill) - characterRoll 
        characterSkillCheck = self.constrainMinMax(characterSkillCheck)

        print("characterSkillCheck")
        print(characterSkillCheck)

        finalCheck = playerSkillCheck - characterSkillCheck
        finalCheck = self.constrainMinMax(finalCheck)

        print("finalCheck")
        print(finalCheck)

        return finalCheck

    # create function to build up character skills if user fails or decrement based on passed in value
    # def characterSkillUpdate(character, characterSkill, value):
    #     intialSkill = getattr(character, characterSkill) 
    #     skillUpdateValue = value/5
    #     setattr(character, characterSkill, (intialSkill + skillUpdateValue))

    def chooseReply(self, playerChoice):
        playerDialogTopic = self.playerData[playerChoice]['topics']
        playerSkill = self.playerData[playerChoice]['skillUsed']
        isTruth = self.playerData[playerChoice]['isTruth']
        print("playerDialogTopic")
        print(playerDialogTopic)

        if(isTruth):
            skillCheck = 1
            print("true so skipping skill check")
        else:
            print("self.playerData[playerChoice].skillUsed")
            print(self.playerData[playerChoice]['skillUsed'])

            skillCheck = self.playerSkillCheck(self.playerCharacter, playerSkill, playerDialogTopic, self.character)

        print("skillCheck")
        print(skillCheck)

        self.nextNode(self.currentNode, playerChoice, skillCheck)


initPlayer = Player(.3, .2, .5, .4, .3, .2, .1, .8, .2, .2)

positiveThought = CharacterThought(.3, ["helpingCrewmates"])
negativeThought = CharacterThought(-.4, ["harmingCrewMates"])

ShipAiCharacter = Character(.1, .1, .1, .1, .1, .2, .1, .1, .1, .1, [positiveThought, negativeThought])

initNode = dialogData['greetingStart']
manager = DialogManager(initPlayer, ShipAiCharacter, dialogData, playerData, initNode)
#print(manager.currentNode['npcResponses']['niceGreeting']['nextDialog'][0]['range'][0])
#manager.nextNode(manager.currentNode, "niceGreeting", 0)
#manager.chooseReply("niceGreeting")

# stay in loop
# read out what NPC says
# list out player's choices
# wait to receive input from player
# do player skill check then call response
# move to next node if there is one else end game
print('===============================')
print('NPC Says')
print('===============================')
print(manager.currentNode["npcText"])

choiceNumber = 0
choices = []
for playerResp in manager.currentNode["playerResponses"]:
            print('choice [' + str(choiceNumber) + '] ' + playerData[playerResp]["text"])
            choices.append({"choice": choiceNumber, "playerResponse": playerResp})
            choiceNumber += 1

print(choices[1]["playerResponse"])
manager.chooseReply(choices[0]["playerResponse"])
print('===============================')
print('NPC Says')
print('===============================')
print(manager.currentNode["npcText"])
# choiceNumber = 0
# while(True):
#     print('===============================')
#     print('NPC Says')
#     print('===============================')
#     print(manager.currentNode["npcText"])
#     print('')
    
#     if(not manager.currentNode["playerResponses"]):
#         print("Game Has Ended")
#         break
#     else:   
#         print('===============================')
#         print('Player Responses')
#         print('===============================')

#         for playerResp in manager.currentNode["playerResponses"]:
#             print('choice [' + str(choiceNumber) + '] ' + playerData[playerResp]["text"])
#             choiceNumber += 1

        
        # choiceNumber = int(raw_input('pick a reply: '))

        # if(choiceNumber == 9):
        #     break

        # print(choiceNumber)
        # print(manager.currentNode.playerChoices[choiceNumber].skill)
        # manager.chooseReply(choiceNumber)



'''
Story Idea: you try to convince the ship AI to jump in to the sun to destroy the ship you are on. 
You have an infection that will override your mind and the ship is sending out a distress signal
The AI cannot destroy the ship so you must convince it to do it.

Build out a small demo
maybe 5 nodes to traverse, multiple paths to the end

build out a smaller demo that has two nodes to work out kinks
'''