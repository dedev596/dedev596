var mainState = {
	preload: function() {
		game.load.image('paddle', 'paddle.png');
		game.load.image('ball', 'ball.png');
	},
	create: function() {
		//definir fond body appli 
		game.stage.backgroundColor = '#82B0D9'
		game.physics.startSystem(Phaser.Physics.ARCADE)

		// sur tout les objets la physique est activer
		game.world.enableBody = true;

		var scorep1 = 0 ; var scoreTextep1 ; 
		scoreTextep1 = this.add.text(6, 05, 'score p1: 0', { fontSize: '22px', fill: '#000' });

		var scorep2 = 0 ; var scoreTextep2 ; 
		scoreTextep2 = this.add.text(6, 610, 'score p2: 0', { fontSize: '22px', fill: '#000' });


		// pour que la fenetre sois au milieux de l'ecran 

		//game.scale.pageAlignHorizontally = true;
		//game.scale.pageAlignVertically = true;

		// player
			//pour positionner le paddle
		this.player = game.add.sprite(game.width/2, game.height-40, 'paddle');
						// 0.5 une seul fois = valeur pour x et y 	
		this.player.anchor.setTo(0.5); 
						//activer une collision pour que le paddle ne sorte pas 
		this.player.body.collideWorldBounds = true;
		this.player.body.immovable = true;

		this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

			//player 2
		this.player2 = game.add.sprite(game.width/2,40, 'paddle');
		this.player2.anchor.setTo(0.5);  
		this.player2.body.collideWorldBounds = true;
		this.player2.body.immovable = true;

		this.leftP2 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
		this.rightP2 = game.input.keyboard.addKey(Phaser.Keyboard.D);
		
		//ball

		this.ball = game.add.sprite(game.width/2, game.height/2, 'ball');
		this.ball.anchor.setTo(0.5); 
		this.ball.body.collideWorldBounds = true;

		// pour que la balle se lance au debut du jeu 
		this.ball.body.velocity.x = 300;
		this.ball.body.velocity.y = 300;

		// pour que la balle rebondisse
		this.ball.body.bounce.setTo(1);
	
	},
	update: function() {
		game.physics.arcade.collide([this.player, this.player2], this.ball)

			// si la balle passe derriere le joueur a perdu 
		if (this.ball.y > this.player.y+20){
			game.state.start('main');
		}
		if (this.ball.y < this.player2.y-20){
			game.state.start('main');
		}
		// si la touche left est enfoncer
		if(this.left.isDown){

			this.player.body.velocity.x = -300;

		}else if (this.right.isDown){
			this.player.body.velocity.x = 300;
		}
		else{
			this.player.body.velocity.x = 0;
		}

		if(this.leftP2.isDown){

			this.player2.body.velocity.x = -300;

		}else if (this.rightP2.isDown){
			this.player2.body.velocity.x = 300;
		}
		else{
			this.player2.body.velocity.x = 0;
		}
	}
};

var game = new Phaser.Game(360, 640);
game.state.add('main', mainState);
game.state.start('main');
