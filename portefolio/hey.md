# 🎮 Guide Complet - Vampire Survivors Clone en Java

## Guide de Construction Étape par Étape

---

## 📋 Table des Matières

1. [Architecture du Projet](#architecture-du-projet)
2. [Étape 1 : Structure de Base](#étape-1--structure-de-base)
3. [Étape 2 : Classes Fondamentales](#étape-2--classes-fondamentales)
4. [Étape 3 : Système d'Entités](#étape-3--système-dentités)
5. [Étape 4 : Système de Combat](#étape-4--système-de-combat)
6. [Étape 5 : Système de Progression](#étape-5--système-de-progression)
7. [Étape 6 : Tests Unitaires](#étape-6--tests-unitaires)
8. [Étape 7 : Documentation](#étape-7--documentation)

---

## Architecture du Projet

### Structure des Dossiers

```
VampireSurvivorsClone/
├── build.gradle                          # Configuration Gradle
├── settings.gradle                       # Paramètres Gradle
├── gradlew                              # Wrapper Gradle (Unix)
├── gradlew.bat                          # Wrapper Gradle (Windows)
├── README.md                            # Documentation principale
├── .gitignore                           # Configuration Git
│
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
│
├── docs/
│   ├── GAME_DESIGN_DOCUMENT.md         # Document de conception
│   ├── ARCHITECTURE.md                  # Architecture détaillée
│   ├── class_diagram.puml              # Diagramme UML de classes
│   └── sequence_diagram.puml           # Diagramme UML de séquence
│
└── src/
    ├── main/
    │   └── java/
    │       └── com/
    │           └── game/
    │               ├── core/            # Classes de base
    │               │   ├── GameObject.java
    │               │   ├── GameConfig.java
    │               │   └── Main.java
    │               │
    │               ├── entities/        # Entités du jeu
    │               │   ├── Entity.java
    │               │   ├── Player.java
    │               │   ├── Enemy.java
    │               │   ├── Zombie.java
    │               │   ├── Bat.java
    │               │   └── Projectile.java
    │               │
    │               ├── weapons/         # Système d'armes
    │               │   ├── Weapon.java
    │               │   ├── ProjectileWeapon.java
    │               │   ├── MagicWand.java
    │               │   ├── Knife.java
    │               │   └── Garlic.java
    │               │
    │               ├── systems/         # Systèmes de jeu
    │               │   ├── GameSystem.java
    │               │   ├── CollisionSystem.java
    │               │   ├── SpawnSystem.java
    │               │   └── WeaponSystem.java
    │               │
    │               ├── ui/              # Interface utilisateur
    │               │   ├── HUD.java
    │               │   ├── LevelUpUI.java
    │               │   └── GameOverUI.java
    │               │
    │               └── utils/           # Utilitaires
    │                   ├── EnemyFactory.java
    │                   ├── WeaponFactory.java
    │                   └── Vector2D.java
    │
    └── test/
        └── java/
            └── com/
                └── game/
                    ├── entities/
                    │   ├── PlayerTest.java
                    │   └── ZombieTest.java
                    ├── weapons/
                    │   └── WeaponTest.java
                    └── systems/
                        └── CollisionSystemTest.java
```

---

## Étape 1 : Structure de Base

### 1.1 Fichier `build.gradle`

```gradle
plugins {
    id 'java'
    id 'application'
    id 'jacoco'
}

group = 'com.game'
version = '1.0.0'
sourceCompatibility = '17'
targetCompatibility = '17'

application {
    mainClass = 'com.game.core.Main'
}

repositories {
    mavenCentral()
}

ext {
    gdxVersion = '1.12.1'
    junitVersion = '5.10.1'
}

dependencies {
    // LibGDX
    implementation "com.badlogicgames.gdx:gdx:$gdxVersion"
    implementation "com.badlogicgames.gdx:gdx-backend-lwjgl3:$gdxVersion"
    implementation "com.badlogicgames.gdx:gdx-platform:$gdxVersion:natives-desktop"
    
    // Testing
    testImplementation "org.junit.jupiter:junit-jupiter-api:$junitVersion"
    testImplementation "org.junit.jupiter:junit-jupiter-params:$junitVersion"
    testRuntimeOnly "org.junit.jupiter:junit-jupiter-engine:$junitVersion"
}

test {
    useJUnitPlatform()
    testLogging {
        events "passed", "skipped", "failed"
    }
}

jacoco {
    toolVersion = "0.8.11"
}

jacocoTestReport {
    dependsOn test
    reports {
        xml.required = true
        html.required = true
    }
}

javadoc {
    options.encoding = 'UTF-8'
    options.author = true
    options.version = true
}
```

### 1.2 Fichier `settings.gradle`

```gradle
rootProject.name = 'VampireSurvivorsClone'
```

### 1.3 Fichier `.gitignore`

```
# Gradle
.gradle/
build/
out/
bin/

# IDE
.idea/
*.iml
.vscode/
.settings/
.classpath
.project

# OS
.DS_Store
Thumbs.db

# Java
*.class
*.log
*.jar
*.war
*.ear

# Test
*.exec
```

### 1.4 Fichier `README.md` (base)

```markdown
# Vampire Survivors Clone

Projet de jeu 2D en Java démontrant les principes de la POO.

## Installation

```bash
./gradlew build
```

## Lancer le jeu

```bash
./gradlew run
```

## Tests

```bash
./gradlew test
./gradlew jacocoTestReport
```
```

---

## Étape 2 : Classes Fondamentales

### 2.1 `src/main/java/com/game/core/GameObject.java`

```java
package com.game.core;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Rectangle;

/**
 * Classe de base abstraite pour tous les objets du jeu.
 * Démontre le principe d'ABSTRACTION.
 */
public abstract class GameObject {
    protected float x;
    protected float y;
    protected float width;
    protected float height;
    protected boolean active;
    protected Rectangle bounds;
    
    public GameObject(float x, float y) {
        this.x = x;
        this.y = y;
        this.active = true;
        this.bounds = new Rectangle();
    }
    
    /**
     * Met à jour l'objet (logique de jeu).
     * Méthode abstraite - doit être implémentée par les sous-classes.
     */
    public abstract void update(float delta);
    
    /**
     * Affiche l'objet à l'écran.
     * Méthode abstraite - doit être implémentée par les sous-classes.
     */
    public abstract void render(SpriteBatch batch);
    
    /**
     * Retourne le rectangle de collision.
     */
    public Rectangle getBounds() {
        bounds.set(x, y, width, height);
        return bounds;
    }
    
    // Getters/Setters - Démontre l'ENCAPSULATION
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
    
    public float getX() {
        return x;
    }
    
    public float getY() {
        return y;
    }
    
    public void setPosition(float x, float y) {
        this.x = x;
        this.y = y;
    }
    
    public float getCenterX() {
        return x + width / 2;
    }
    
    public float getCenterY() {
        return y + height / 2;
    }
    
    public float distanceTo(GameObject other) {
        float dx = getCenterX() - other.getCenterX();
        float dy = getCenterY() - other.getCenterY();
        return (float) Math.sqrt(dx * dx + dy * dy);
    }
}
```

### 2.2 `src/main/java/com/game/core/GameConfig.java`

```java
package com.game.core;

/**
 * Configuration globale du jeu.
 * Utilise le pattern Singleton (optionnel).
 */
public class GameConfig {
    // Fenêtre
    public static final int WINDOW_WIDTH = 1280;
    public static final int WINDOW_HEIGHT = 720;
    public static final String WINDOW_TITLE = "Vampire Survivors Clone";
    
    // Gameplay
    public static final float GAME_DURATION = 900; // 15 minutes en secondes
    public static final int BASE_XP_REQUIREMENT = 10;
    public static final float XP_MULTIPLIER = 1.5f;
    
    // Player
    public static final float PLAYER_SPEED = 150f;
    public static final float PLAYER_MAX_HEALTH = 100f;
    public static final float PLAYER_SIZE = 32f;
    
    // Enemies
    public static final float ZOMBIE_SPEED = 50f;
    public static final float ZOMBIE_HEALTH = 30f;
    public static final float ZOMBIE_DAMAGE = 10f;
    
    public static final float BAT_SPEED = 100f;
    public static final float BAT_HEALTH = 15f;
    public static final float BAT_DAMAGE = 8f;
    
    // Debug
    public static boolean DEBUG_MODE = false;
    
    private GameConfig() {
        // Empêche l'instanciation
    }
}
```

### 2.3 `src/main/java/com/game/core/Main.java`

```java
package com.game.core;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;
import com.game.entities.Player;
import com.game.entities.Zombie;
import com.game.entities.Enemy;

import java.util.ArrayList;
import java.util.List;

/**
 * Classe principale du jeu.
 * Point d'entrée de l'application LibGDX.
 */
public class Main extends ApplicationAdapter {
    private SpriteBatch batch;
    private Player player;
    private List<Enemy> enemies;
    
    @Override
    public void create() {
        batch = new SpriteBatch();
        
        // Créer le joueur au centre
        player = new Player(
            GameConfig.WINDOW_WIDTH / 2f,
            GameConfig.WINDOW_HEIGHT / 2f
        );
        
        // Créer quelques ennemis de test
        enemies = new ArrayList<>();
        enemies.add(new Zombie(100, 100));
        enemies.add(new Zombie(200, 200));
        enemies.add(new Zombie(300, 150));
        
        // Définir le joueur comme cible pour tous les ennemis
        for (Enemy enemy : enemies) {
            enemy.setTarget(player);
        }
    }
    
    @Override
    public void render() {
        float delta = Gdx.graphics.getDeltaTime();
        
        // Mise à jour
        handleInput(delta);
        update(delta);
        
        // Affichage
        Gdx.gl.glClearColor(0.1f, 0.1f, 0.15f, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        
        batch.begin();
        render(batch);
        batch.end();
    }
    
    private void handleInput(float delta) {
        Vector2 direction = new Vector2();
        
        if (Gdx.input.isKeyPressed(Input.Keys.W) || Gdx.input.isKeyPressed(Input.Keys.UP)) {
            direction.y += 1;
        }
        if (Gdx.input.isKeyPressed(Input.Keys.S) || Gdx.input.isKeyPressed(Input.Keys.DOWN)) {
            direction.y -= 1;
        }
        if (Gdx.input.isKeyPressed(Input.Keys.A) || Gdx.input.isKeyPressed(Input.Keys.LEFT)) {
            direction.x -= 1;
        }
        if (Gdx.input.isKeyPressed(Input.Keys.D) || Gdx.input.isKeyPressed(Input.Keys.RIGHT)) {
            direction.x += 1;
        }
        
        if (direction.len() > 0) {
            player.move(direction, delta);
        }
    }
    
    private void update(float delta) {
        if (player.isActive()) {
            player.update(delta);
        }
        
        for (Enemy enemy : enemies) {
            if (enemy.isActive()) {
                enemy.update(delta);
            }
        }
        
        // Supprimer les ennemis morts
        enemies.removeIf(e -> !e.isActive());
    }
    
    private void render(SpriteBatch batch) {
        if (player.isActive()) {
            player.render(batch);
        }
        
        for (Enemy enemy : enemies) {
            if (enemy.isActive()) {
                enemy.render(batch);
            }
        }
    }
    
    @Override
    public void dispose() {
        batch.dispose();
        player.dispose();
        for (Enemy enemy : enemies) {
            if (enemy instanceof Zombie) {
                ((Zombie) enemy).dispose();
            }
        }
    }
}
```

---

## Étape 3 : Système d'Entités

### 3.1 `src/main/java/com/game/entities/Entity.java`

```java
package com.game.entities;

import com.badlogic.gdx.math.Vector2;
import com.game.core.GameObject;

/**
 * Classe de base pour toutes les entités vivantes.
 * Démontre l'HÉRITAGE et l'ABSTRACTION.
 */
public abstract class Entity extends GameObject {
    protected float health;
    protected float maxHealth;
    protected float speed;
    protected Vector2 velocity;
    protected boolean justHit;
    protected float hitFlashTimer;
    
    protected static final float HIT_FLASH_DURATION = 0.1f;
    
    public Entity(float x, float y, float maxHealth) {
        super(x, y);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.velocity = new Vector2();
        this.justHit = false;
        this.hitFlashTimer = 0;
    }
    
    /**
     * Applique des dégâts à l'entité.
     * Démontre l'ENCAPSULATION - contrôle de l'accès aux données.
     */
    public void takeDamage(float damage) {
        if (damage <= 0) return;
        
        health -= damage;
        justHit = true;
        hitFlashTimer = HIT_FLASH_DURATION;
        
        if (health <= 0) {
            health = 0;
            onDeath();
        }
    }
    
    /**
     * Soigne l'entité.
     */
    public void heal(float amount) {
        if (amount <= 0) return;
        health = Math.min(health + amount, maxHealth);
    }
    
    /**
     * Vérifie si l'entité est morte.
     */
    public boolean isDead() {
        return health <= 0;
    }
    
    /**
     * Appelé quand l'entité meurt.
     * Méthode abstraite - comportement spécifique à chaque type.
     */
    public abstract void onDeath();
    
    /**
     * Met à jour l'état de l'entité.
     */
    protected void updateEntity(float delta) {
        if (justHit) {
            hitFlashTimer -= delta;
            if (hitFlashTimer <= 0) {
                justHit = false;
            }
        }
    }
    
    /**
     * Déplace l'entité selon sa vélocité.
     */
    protected void move(float delta) {
        x += velocity.x * delta;
        y += velocity.y * delta;
    }
    
    // Getters - ENCAPSULATION
    public float getHealth() {
        return health;
    }
    
    public float getMaxHealth() {
        return maxHealth;
    }
    
    public float getSpeed() {
        return speed;
    }
    
    public Vector2 getVelocity() {
        return velocity;
    }
    
    public boolean isJustHit() {
        return justHit;
    }
    
    public float getHealthPercentage() {
        return maxHealth > 0 ? health / maxHealth : 0;
    }
    
    // Setters avec validation
    public void setSpeed(float speed) {
        this.speed = Math.max(0, speed);
    }
    
    public void setMaxHealth(float maxHealth) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
    }
}
```

### 3.2 `src/main/java/com/game/entities/Player.java`

```java
package com.game.entities;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.math.Vector2;
import com.game.core.GameConfig;
import com.game.weapons.Weapon;

import java.util.ArrayList;
import java.util.List;

/**
 * Classe représentant le joueur.
 * Démontre tous les principes POO : HÉRITAGE, ENCAPSULATION, POLYMORPHISME.
 */
public class Player extends Entity {
    // Progression
    private int level;
    private int experience;
    private int experienceToNextLevel;
    
    // Stats
    private float armor;
    private float recovery;
    private float magnetRange;
    
    // Armes
    private List<Weapon> weapons;
    
    // Rendu
    private ShapeRenderer shapeRenderer;
    
    public Player(float x, float y) {
        super(x, y, GameConfig.PLAYER_MAX_HEALTH);
        this.width = GameConfig.PLAYER_SIZE;
        this.height = GameConfig.PLAYER_SIZE;
        this.speed = GameConfig.PLAYER_SPEED;
        
        this.level = 1;
        this.experience = 0;
        this.experienceToNextLevel = GameConfig.BASE_XP_REQUIREMENT;
        
        this.armor = 0;
        this.recovery = 0;
        this.magnetRange = 50;
        
        this.weapons = new ArrayList<>();
        this.shapeRenderer = new ShapeRenderer();
    }
    
    /**
     * Déplace le joueur dans une direction.
     */
    public void move(Vector2 direction, float delta) {
        if (direction.len() > 0) {
            velocity.set(direction).nor().scl(speed);
            move(delta);
        } else {
            velocity.set(0, 0);
        }
    }
    
    /**
     * Ajoute de l'expérience et gère le passage de niveau.
     */
    public boolean addExperience(int amount) {
        experience += amount;
        
        if (experience >= experienceToNextLevel) {
            levelUp();
            return true;
        }
        return false;
    }
    
    /**
     * Passe au niveau supérieur.
     */
    private void levelUp() {
        level++;
        experience -= experienceToNextLevel;
        experienceToNextLevel = (int) (GameConfig.BASE_XP_REQUIREMENT * 
                                       Math.pow(GameConfig.XP_MULTIPLIER, level - 1));
        
        if (experience >= experienceToNextLevel) {
            levelUp();
        }
    }
    
    /**
     * Ajoute une arme au joueur.
     */
    public void addWeapon(Weapon weapon) {
        if (weapon != null) {
            weapon.setOwner(this);
            weapons.add(weapon);
        }
    }
    
    /**
     * POLYMORPHISME : Surcharge de takeDamage pour ajouter l'armure.
     */
    @Override
    public void takeDamage(float damage) {
        float reducedDamage = damage * (1 - armor);
        super.takeDamage(reducedDamage);
    }
    
    @Override
    public void update(float delta) {
        updateEntity(delta);
        
        // Régénération
        if (recovery > 0 && health < maxHealth) {
            heal(recovery * delta);
        }
        
        // Mise à jour des armes
        for (Weapon weapon : weapons) {
            weapon.update(delta);
        }
    }
    
    @Override
    public void render(SpriteBatch batch) {
        batch.end();
        
        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
        
        if (isJustHit()) {
            shapeRenderer.setColor(Color.RED);
        } else {
            shapeRenderer.setColor(Color.CYAN);
        }
        
        shapeRenderer.circle(getCenterX(), getCenterY(), width / 2);
        shapeRenderer.end();
        
        batch.begin();
    }
    
    @Override
    public void onDeath() {
        setActive(false);
        System.out.println("Game Over! Level reached: " + level);
    }
    
    public void dispose() {
        shapeRenderer.dispose();
    }
    
    // Getters
    public int getLevel() {
        return level;
    }
    
    public int getExperience() {
        return experience;
    }
    
    public int getExperienceToNextLevel() {
        return experienceToNextLevel;
    }
    
    public float getExperiencePercentage() {
        return (float) experience / experienceToNextLevel;
    }
    
    public float getArmor() {
        return armor;
    }
    
    public float getRecovery() {
        return recovery;
    }
    
    public float getMagnetRange() {
        return magnetRange;
    }
    
    public List<Weapon> getWeapons() {
        return weapons;
    }
    
    // Setters avec validation
    public void setArmor(float armor) {
        this.armor = Math.max(0, Math.min(0.9f, armor));
    }
    
    public void addArmor(float amount) {
        setArmor(armor + amount);
    }
    
    public void setRecovery(float recovery) {
        this.recovery = Math.max(0, recovery);
    }
    
    public void addRecovery(float amount) {
        setRecovery(recovery + amount);
    }
    
    public void setMagnetRange(float range) {
        this.magnetRange = Math.max(0, range);
    }
    
    public void addMagnetRange(float amount) {
        setMagnetRange(magnetRange + amount);
    }
}
```

### 3.3 `src/main/java/com/game/entities/Enemy.java`

```java
package com.game.entities;

import com.badlogic.gdx.math.Vector2;

/**
 * Classe de base pour tous les ennemis.
 * Démontre l'ABSTRACTION et l'HÉRITAGE.
 */
public abstract class Enemy extends Entity {
    protected int experienceValue;
    protected float damage;
    protected Entity target;
    protected float attackCooldown;
    protected float baseAttackCooldown;
    
    public Enemy(float x, float y, float maxHealth, float damage) {
        super(x, y, maxHealth);
        this.damage = damage;
        this.experienceValue = (int) (maxHealth / 10 + damage);
        this.attackCooldown = 0;
        this.baseAttackCooldown = 1.0f;
    }
    
    /**
     * Définit la cible de l'ennemi.
     */
    public void setTarget(Entity target) {
        this.target = target;
    }
    
    /**
     * Déplace l'ennemi vers sa cible.
     */
    protected void moveTowardsTarget(float delta) {
        if (target == null || !target.isActive()) {
            return;
        }
        
        Vector2 targetPos = new Vector2(target.getCenterX(), target.getCenterY());
        Vector2 currentPos = new Vector2(getCenterX(), getCenterY());
        Vector2 direction = targetPos.sub(currentPos);
        
        if (direction.len() > 0) {
            direction.nor();
            velocity.set(direction).scl(speed);
            move(delta);
        }
    }
    
    /**
     * Tente d'attaquer la cible.
     */
    public boolean tryAttack(Entity target, float delta) {
        attackCooldown -= delta;
        
        if (attackCooldown <= 0 && isInAttackRange(target)) {
            attack(target);
            attackCooldown = baseAttackCooldown;
            return true;
        }
        
        return false;
    }
    
    /**
     * Vérifie si la cible est à portée d'attaque.
     */
    protected boolean isInAttackRange(Entity target) {
        return distanceTo(target) < (width / 2 + target.width / 2);
    }
    
    /**
     * Attaque la cible.
     * Méthode abstraite - comportement spécifique à chaque ennemi.
     */
    public abstract void attack(Entity target);
    
    @Override
    public void update(float delta) {
        updateEntity(delta);
        
        if (target != null) {
            moveTowardsTarget(delta);
        }
    }
    
    @Override
    public void onDeath() {
        setActive(false);
    }
    
    // Getters
    public int getExperienceValue() {
        return experienceValue;
    }
    
    public float getDamage() {
        return damage;
    }
}
```

### 3.4 `src/main/java/com/game/entities/Zombie.java`

```java
package com.game.entities;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.game.core.GameConfig;

/**
 * Zombie - ennemi lent au corps à corps.
 * Démontre le POLYMORPHISME par l'implémentation de attack().
 */
public class Zombie extends Enemy {
    private ShapeRenderer shapeRenderer;
    
    public Zombie(float x, float y) {
        super(x, y, GameConfig.ZOMBIE_HEALTH, GameConfig.ZOMBIE_DAMAGE);
        this.width = 28;
        this.height = 28;
        this.speed = GameConfig.ZOMBIE_SPEED;
        this.shapeRenderer = new ShapeRenderer();
    }
    
    /**
     * POLYMORPHISME : Implémentation spécifique de l'attaque zombie.
     */
    @Override
    public void attack(Entity target) {
        if (target != null && isInAttackRange(target)) {
            target.takeDamage(damage);
        }
    }
    
    @Override
    public void update(float delta) {
        super.update(delta);
        
        if (target != null) {
            tryAttack(target, delta);
        }
    }
    
    @Override
    public void render(SpriteBatch batch) {
        batch.end();
        
        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
        
        if (isJustHit()) {
            shapeRenderer.setColor(Color.WHITE);
        } else {
            shapeRenderer.setColor(Color.GREEN);
        }
        
        shapeRenderer.rect(x, y, width, height);
        shapeRenderer.end();
        
        batch.begin();
    }
    
    public void dispose() {
        shapeRenderer.dispose();
    }
}
```

### 3.5 `src/main/java/com/game/entities/Bat.java`

```java
package com.game.entities;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.game.core.GameConfig;

/**
 * Chauve-souris - ennemi rapide volant.
 * Démontre le POLYMORPHISME avec un comportement différent.
 */
public class Bat extends Enemy {
    private ShapeRenderer shapeRenderer;
    private float wobbleTimer;
    
    public Bat(float x, float y) {
        super(x, y, GameConfig.BAT_HEALTH, GameConfig.BAT_DAMAGE);
        this.width = 24;
        this.height = 24;
        this.speed = GameConfig.BAT_SPEED;
        this.shapeRenderer = new ShapeRenderer();
        this.wobbleTimer = 0;
        this.baseAttackCooldown = 0.5f;
    }
    
    /**
     * POLYMORPHISME : Attaque avec recul après impact.
     */
    @Override
    public void attack(Entity target) {
        if (target != null && isInAttackRange(target)) {
            target.takeDamage(damage);
            
            // Recul après attaque
            float knockbackX = (getCenterX() - target.getCenterX()) * 2;
            float knockbackY = (getCenterY() - target.getCenterY()) * 2;
            setPosition(x + knockbackX, y + knockbackY);
        }
    }
    
    @Override
    public void update(float delta) {
        super.update(delta);
        
        // Effet de vol ondulant
        wobbleTimer += delta * 5;
        y += (float) Math.sin(wobbleTimer) * 10 * delta;
        
        if (target != null) {
            tryAttack(target, delta);
        }
    }
    
    @Override
    public void render(SpriteBatch batch) {
        batch.end();
        
        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
        
        if (isJustHit()) {
            shapeRenderer.setColor(Color.WHITE);
        } else {
            shapeRenderer.setColor(Color.PURPLE);
        }
        
        // Forme de losange pour la chauve-souris
        float centerX = getCenterX();
        float centerY = getCenterY();
        float halfWidth = width / 2;
        float halfHeight = height / 2;
        
        shapeRenderer.triangle(
            centerX, centerY + halfHeight,
            centerX - halfWidth, centerY,
            centerX, centerY - halfHeight
        );
        shapeRenderer.triangle(
            centerX, centerY + halfHeight,
            centerX + halfWidth, centerY,
            centerX, centerY - halfHeight
        );
        
        shapeRenderer.end();
        batch.begin();
    }
    
    public void dispose() {
        shapeRenderer.dispose();
    }
}
```

---

## Étape 4 : Système de Combat

### 4.1 `src/main/java/com/game/weapons/Weapon.java`

```java
package com.game.weapons;

import com.game.entities.Enemy;
import com.game.entities.Player;

import java.util.List;

/**
 * Classe de base abstraite pour toutes les armes.
 * Démontre l'ABSTRACTION.
 */
public abstract class Weapon {
    protected String name;
    protected float baseDamage;
    protected float attackSpeed;
    protected float range;
    protected int level;
    protected float cooldown;
    protected Player owner;
    
    protected static final int MAX_LEVEL = 8;
    
    public Weapon(String name, float baseDamage, float attackSpeed, float range) {
        this.name = name;
        this.baseDamage = baseDamage;
        this.attackSpeed = attackSpeed;
        this.range = range;
        this.level = 1;
        this.cooldown = 0;
    }
    
    /**
     * Attaque avec l'arme.
     * Méthode abstraite - comportement spécifique à chaque arme.
     */
    public abstract void attack(List<Enemy> enemies);
    
    /**
     * Améliore l'arme.
     */
    public void upgrade() {
        if (level < MAX_LEVEL) {
            level++;
            baseDamage *= 1.2f;
            attackSpeed *= 1.05f;
        }
    }
    
    /**
     * Met à jour l'arme.
     */
    public void update(float delta) {
        cooldown -= delta;
    }
    
    /**
     * Vérifie si l'arme est prête à tirer.
     */
    protected boolean isReady() {
        return cooldown <= 0;
    }
    
    /**
     * Réinitialise le cooldown.
     */
    protected void resetCooldown() {
        cooldown = 1.0f / attackSpeed;
    }
    
    /**
     * Calcule les dégâts actuels.
     */
    public float getDamage() {
        return baseDamage * (1 + (level - 1) * 0.1f);
    }
    
    /**
     * Trouve l'ennemi le plus proche.
     */
    protected Enemy findNearestEnemy(List<Enemy> enemies) {
        if (owner == null || enemies.isEmpty()) {
            return null;
        }
        
        Enemy nearest = null;
        float nearestDistance = range;
        
        for (Enemy enemy : enemies) {
            if (enemy.isActive()) {
                float distance = owner.distanceTo(enemy);
                if (distance < nearestDistance) {
                    nearest = enemy;
                    nearestDistance = distance;
                }
            }
        }
        
        return nearest;
    }
    
    // Getters/Setters
    public String getName() {
        return name;
    }
    
    public int getLevel() {
        return level;
    }
    
    public Player getOwner() {
        return owner;
    }
    
    public void setOwner(Player owner) {
        this.owner = owner;
    }
    
    public boolean isMaxLevel() {
        return level >= MAX_LEVEL;
    }
}
```

### 4.2 `src/main/java/com/game/weapons/MagicWand.java`

```java
package com.game.weapons;

import com.game.entities.Enemy;

import java.util.List;

/**
 * Baguette magique - tire des projectiles vers l'ennemi le plus proche.
 * Démontre le POLYMORPHISME.
 */
public class MagicWand extends Weapon {
    
    public MagicWand() {
        super("Magic Wand", 10, 1.5f, 300);
    }
    
    /**
     * POLYMORPHISME : Implémentation de l'attaque de la baguette.
     */
    @Override
    public void attack(List<Enemy> enemies) {
        if (!isReady() || owner == null) {
            return;
        }
        
        Enemy target = findNearestEnemy(enemies);
        if (target != null) {
            // Pour l'instant, dégâts directs
            // Plus tard : créer des projectiles
            target.takeDamage(getDamage());
            resetCooldown();
        }
    }
    
    @Override
    public void upgrade() {
        super.upgrade();
        // Améliorations spécifiques à la baguette
        range += 20;
    }
}
```

---

## Étape 5 : Système de Progression

*(La suite dans le prochain message - ce fichier devient trop long)*

### À venir :
- Système de ramassage d'XP
- Factory Pattern pour les ennemis
- Systèmes de jeu (Collision, Spawn)
- Tests unitaires complets

---

## Résumé des Principes POO Démontrés

### ✅ ENCAPSULATION
- Tous les champs sont `private` ou `protected`
- Accès contrôlé via getters/setters
- Validation dans les setters

### ✅ ABSTRACTION
- Classes abstraites : `GameObject`, `Entity`, `Enemy`, `Weapon`
- Méthodes abstraites : `update()`, `render()`, `attack()`, `onDeath()`

### ✅ HÉRITAGE
- `GameObject` → `Entity` → `Player`/`Enemy`
- `Entity` → `Enemy` → `Zombie`/`Bat`
- Réutilisation du code

### ✅ POLYMORPHISME
- Méthode `attack()` différente pour chaque ennemi
- Méthode `takeDamage()` surchargée dans `Player`
- Comportements variés selon le type

---

**Prochaine étape : Voulez-vous que je continue avec les tests unitaires et la documentation complète ?**
