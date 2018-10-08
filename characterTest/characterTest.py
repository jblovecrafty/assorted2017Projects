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
    logic = 0
    empathy = 0
    guilt = 0

    def __init__(self, lying, intimidation, charm, humor, flattery, seduction, pity, logic, empathy, guilt):
        self.lying = lying
        self.intimidation = intimidation
        self.charm = charm
        self.humor = humor
        self.flattery = flattery
        self.seduction = seduction
        self.pity = pity
        self.logic = logic
        self.empathy = empathy
        self.guilt = guilt

class Character:
    #dictionary of emotions
    emotions = {}

    #credibility goes from 0 to 1 (percentage)
    credibility = 0

    # an array of CharacterThoughts important to the npc
    characterAnimus = []

    def __init__(self, emotions, credibility, characterAnimus):
      self.emotions = emotions
      self.credibility = credibility
      self.characterAnimus = characterAnimus

class CharacterThought:
    #dictionary of emotions
    emotionalImpact = {}
    topics = []

    def __init__(self, emotionalImpact, topics):
      self.emotionalImpact = emotionalImpact
      self.topics = topics

class DialogFragment:
    #dictionary of emotional intent
    emotionalIntent = {}
    
    #text of the dialog
    text = ""

    #topics this fragment deals with
    topics = []

    def __init__(self, emotionalIntent, text, topics):
      self.emotionalIntent = emotionalIntent
      self.text = text
      self.topics = topics

class DialogNode:
    #list of dialog fragments for player to chose from
    dialogFragments = []

    #text from the Character
    text = ""

    #list of Character responses (dialogNodes)
    characterResponses = []

    def __init__(self, dialogFragments, text, characterResponses):
      self.dialogFragments = dialogFragments
      self.text = text
      self.characterResponses = characterResponses

class DialogManager:
    #this class loads up all the nodes and such and handles the player and character interaction

    #function to take in player response and calculating what the next Dialog Node to go to is
    #   1. Player's skill in particular area is used
    #   2. Make skill check
    #       a. If pass then multiple the intent by credibility, then increase credibility. 
    #          If pass increase the skill in the player's area by ratio of how much they made the skill check by
    #       b. If fail then reverse the intent and and decrease credibility
    #          If pass decrease the skill in the player's area by ratio of how much they made the skill check by
    #       c. If the response contains a topic that matches a CharacterThought then add that vector to the character emotional state
    #   3. Then loop through all the character responses and diff the current character emotional vector and go to the DialogNode
    #      That is closest. If there are multiple pick the first one

    #build the player and give them starting stats
    playerCharacter = new Player(.3, .2, .5, .4, .3, .2, .1, .7, .8, .2,)
    
    #build out the character

    #build out the nodes

    #start and manage game


'''
Story Idea: you try to convince the ship AI to jump in to the sun to destroy the ship you are on. 
You have an infection that will override your mind and the ship is sending out a distress signal
The AI cannot destroy the ship so you must convince it to do it.

Build out a small demo
maybe 5 nodes to traverse, multiple paths to the end

build out a smaller demo that has two nodes to work out kinks
'''

npcEmotions = {'Joy': .3, 'Fear' : .1, 'Surprise': .05, 'Sadness': .02, 'Anger': .003, 'Disgust': .002, 'Trust': .7, 'Anticipation': .002 }

sadNode = {'npc': npcEmotions, 'text': 'Sad Node', 'branches': []}
happyNode = {'npc': npcEmotions, 'text': 'Happy Node', 'branches': []}
rootNode = {'npc': npcEmotions, 'text': 'Root Node', 'branches': [sadNode, happyNode], 'playerResponses': [{'text' : 'happy', 'effect': [.5, 0, 0, 0, 0, 0, 0, 0]}, {'text' : 'sad', 'effect': [0, 0, 0, .5, 0, 0, 0, 0]}]


