/**
 * Type declarations for Max for Live's LiveAPI class and custom extensions.
 * LiveAPI is a global class available in the Max for Live V8 JavaScript environment.
 */

/**
 * LiveAPI class for interacting with Ableton Live objects.
 * This is a global class in the Max for Live environment.
 */
declare class LiveAPI {
  /**
   * Create a LiveAPI instance from a path or ID.
   * @param path - Live Object Model path (e.g., "live_set tracks 0")
   */
  constructor(path: string);

  /** The object ID in "id X" format */
  readonly id: string;

  /** The canonical path of the object */
  readonly path: string;

  /** The type of the Live object (e.g., "Track", "Clip", "Device") */
  readonly type: string;

  /** Get a property value from the Live object (returns array) */
  get(property: string): unknown[];

  /** Set a property value on the Live object */
  set(property: string, value: unknown): void;

  /** Call a method on the Live object */
  call(method: string, ...args: unknown[]): unknown;

  /** Navigate to a different Live Object Model path */
  goto(path: string): void;

  /** Get information about the current object (properties, children, etc.) */
  readonly info: string;

  // ===== Custom extensions from live-api-extensions.js =====

  /**
   * Static factory method to create a LiveAPI instance from various formats.
   * @param idOrPath - ID number/string, full path, or ["id", "123"] array
   */
  static from(idOrPath: string | number | [string, string | number]): LiveAPI;

  /** Check if this LiveAPI instance points to a valid object */
  exists(): boolean;

  /**
   * Get a property value, automatically unwrapping single-value arrays.
   * Handles special cases like routing properties and scale intervals.
   */
  getProperty(property: string): unknown;

  /**
   * Set a property value with automatic formatting for special properties.
   * Handles routing properties (JSON format) and ID properties ("id X" format).
   */
  setProperty(property: string, value: unknown): void;

  /** Get child object IDs as an array of "id X" strings */
  getChildIds(name: string): string[];

  /** Get child objects as LiveAPI instances */
  getChildren(name: string): LiveAPI[];

  /** Get the color as a CSS hex string (e.g., "#FF0000") */
  getColor(): string | null;

  /** Set the color from a CSS hex string (e.g., "#FF0000") */
  setColor(cssColor: string): void;

  /** Set multiple properties at once, skipping null/undefined values */
  setAll(properties: Record<string, unknown>): void;

  // ===== Index extraction getters =====

  /** Extract track index from path (e.g., "live_set tracks 0" -> 0) */
  readonly trackIndex: number | null;

  /** Extract return track index from path */
  readonly returnTrackIndex: number | null;

  /** Get track category: "regular", "return", or "master" */
  readonly category: "regular" | "return" | "master" | null;

  /** Extract scene index from path */
  readonly sceneIndex: number | null;

  /** Extract clip slot index from path */
  readonly clipSlotIndex: number | null;

  /** Extract device index from path (last device in nested racks) */
  readonly deviceIndex: number | null;

  /** Get time signature as "N/D" string (e.g., "4/4") */
  readonly timeSignature: string | null;
}

/**
 * BrowserItem represents an item in the Ableton browser hierarchy.
 */
declare class BrowserItem {
  /** The canonical display name of the browser item */
  readonly name: string;

  /** Unique identifier URI for this item */
  readonly uri: string;

  /** Source of the item (Live pack, user library, etc.) */
  readonly source: string;

  /** Child items (read-only access to descendants) */
  readonly children: BrowserItem[];

  /** Whether this item is a folder */
  readonly is_folder: boolean;

  /** Whether this item is a device */
  readonly is_device: boolean;

  /** Whether this item can be loaded */
  readonly is_loadable: boolean;

  /** Whether this item is currently selected */
  readonly is_selected: boolean;

  /** Iterator for child items */
  iter_children(): BrowserItemIterator;
}

/**
 * Iterator for BrowserItem children
 */
declare class BrowserItemIterator {
  /** Get the next child item */
  next(): BrowserItem | null;
}

/**
 * Browser provides access to the Live browser database
 */
declare class Browser {
  /** Audio effects category */
  readonly audio_effects: BrowserItem;

  /** Clips category */
  readonly clips: BrowserItem;

  /** Current project category */
  readonly current_project: BrowserItem;

  /** Drums category */
  readonly drums: BrowserItem;

  /** Instruments category */
  readonly instruments: BrowserItem;

  /** MIDI effects category */
  readonly midi_effects: BrowserItem;

  /** Packs category */
  readonly packs: BrowserItem;

  /** Plugins category */
  readonly plugins: BrowserItem;

  /** Samples category */
  readonly samples: BrowserItem;

  /** Sounds category */
  readonly sounds: BrowserItem;

  /** User library category */
  readonly user_library: BrowserItem;

  /** Legacy libraries */
  readonly legacy_libraries: BrowserItem[];

  /** User folders */
  readonly user_folders: BrowserItem[];

  /** Current hotswap filter type */
  readonly filter_type: number;

  /** Current hotswap target */
  readonly hotswap_target: BrowserItem | null;

  /**
   * Load a browser item into the Live set
   * @param item - The browser item to load
   */
  load_item(item: BrowserItem): void;

  /**
   * Preview a browser item
   * @param item - The browser item to preview
   */
  preview_item(item: BrowserItem): void;

  /** Stop the current preview */
  stop_preview(): void;

  /**
   * Get the relationship between an item and the hotswap target
   * @param item - The browser item to check
   * @returns Relationship: "ancestor", "descendant", "equal", or "none"
   */
  relation_to_hotswap_target(
    item: BrowserItem,
  ): "ancestor" | "descendant" | "equal" | "none";
}
