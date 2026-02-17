import os
import re
import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
from pathlib import Path
import threading

# Your app's color palette
COLORS = {
    'bg': '#0e0f11',
    'panel': '#111318',
    'text': '#ffffff',
    'muted': '#bfbfbf',
    'tab': '#1a1d24',
    'tab_active': '#222735',
    'border': '#2a2e3a',
    'highlight': '#e0e0e0'
}

# CSS to inject - ONLY COLOR PALETTE, NO LAYOUT CHANGES
INJECTED_STYLE = f"""
<style>
/* Dark theme v2 - layout preserved */
* {{
    margin: 0;
    padding: 0;
}}

html {{
    background: {COLORS['bg']};
}}

body {{
    background: {COLORS['bg']} !important;
    color: {COLORS['text']} !important;
}}

h1, h2, h3, h4, h5, h6 {{
    color: #ffffff !important;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    font-weight: bold !important;
}}

p, div, span, li, ul, ol, td, th {{
    color: {COLORS['text']} !important;
}}

b, strong {{
    color: {COLORS['highlight']} !important;
}}

a {{
    color: {COLORS['highlight']} !important;
}}

a:hover {{
    color: {COLORS['muted']} !important;
}}

table {{
    background: {COLORS['panel']} !important;
    border-color: {COLORS['border']} !important;
}}

td, th {{
    border-color: {COLORS['border']} !important;
    background: {COLORS['panel']} !important;
}}

th {{
    background: {COLORS['tab']} !important;
}}

img {{
    background: transparent;
}}
</style>
"""

class SkillsConverterGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Skills HTML Converter - Color Palette Only")
        self.root.geometry("700x600")
        self.root.configure(bg='#1a1d24')
        
        # Stats
        self.total_files = 0
        self.processed_files = 0
        self.skipped_files = 0
        self.error_files = 0
        
        self.setup_ui()
        
    def setup_ui(self):
        # Title
        title_frame = tk.Frame(self.root, bg='#1a1d24')
        title_frame.pack(pady=10, padx=10, fill='x')
        
        title = tk.Label(title_frame, text="Skills HTML Converter", 
                        font=('Arial', 16, 'bold'), 
                        bg='#1a1d24', fg='#e0e0e0')
        title.pack()
        
        subtitle = tk.Label(title_frame, 
                           text="Apply dark theme color palette to Skills HTML files (layout unchanged)",
                           font=('Arial', 9), 
                           bg='#1a1d24', fg='#bfbfbf')
        subtitle.pack()
        
        # Stats frame
        stats_frame = tk.Frame(self.root, bg='#111318', bd=2, relief='solid')
        stats_frame.pack(pady=10, padx=10, fill='x')
        
        self.stats_label = tk.Label(stats_frame, 
                                    text="Ready to process files...",
                                    font=('Arial', 10),
                                    bg='#111318', fg='#ffffff',
                                    justify='left', anchor='w')
        self.stats_label.pack(pady=10, padx=10, fill='x')
        
        # Progress bar
        self.progress = ttk.Progressbar(self.root, mode='indeterminate')
        self.progress.pack(pady=5, padx=10, fill='x')
        
        # Log area
        log_label = tk.Label(self.root, text="Processing Log:", 
                            font=('Arial', 10, 'bold'),
                            bg='#1a1d24', fg='#e0e0e0')
        log_label.pack(pady=(10,5), padx=10, anchor='w')
        
        self.log_text = scrolledtext.ScrolledText(self.root, 
                                                  height=20, 
                                                  bg='#0e0f11', 
                                                  fg='#ffffff',
                                                  font=('Consolas', 9),
                                                  insertbackground='#ffffff')
        self.log_text.pack(pady=5, padx=10, fill='both', expand=True)
        
        # Buttons
        button_frame = tk.Frame(self.root, bg='#1a1d24')
        button_frame.pack(pady=10, padx=10, fill='x')
        
        self.start_button = tk.Button(button_frame, 
                                      text="Start Processing",
                                      command=self.start_processing,
                                      bg='#2a2e3a', fg='#ffffff',
                                      font=('Arial', 10, 'bold'),
                                      padx=20, pady=10,
                                      cursor='hand2')
        self.start_button.pack(side='left', padx=5)
        
        self.close_button = tk.Button(button_frame,
                                      text="Close",
                                      command=self.root.quit,
                                      bg='#2a2e3a', fg='#ffffff',
                                      font=('Arial', 10),
                                      padx=20, pady=10,
                                      cursor='hand2',
                                      state='disabled')
        self.close_button.pack(side='right', padx=5)
        
    def log(self, message, level='info'):
        """Add message to log"""
        colors = {
            'info': '#ffffff',
            'success': '#00ff00',
            'warning': '#ffaa00',
            'error': '#ff0000',
            'header': '#e0e0e0'
        }
        
        self.log_text.insert('end', message + '\n')
        
        # Color the last line
        last_line_start = self.log_text.index("end-2c linestart")
        last_line_end = self.log_text.index("end-1c")
        
        tag_name = f"{level}_{last_line_start}"
        self.log_text.tag_add(tag_name, last_line_start, last_line_end)
        self.log_text.tag_config(tag_name, foreground=colors.get(level, '#ffffff'))
        
        self.log_text.see('end')
        self.root.update()
        
    def update_stats(self):
        """Update statistics display"""
        stats_text = f"""Total Files: {self.total_files} | Processed: {self.processed_files} | Skipped: {self.skipped_files} | Errors: {self.error_files}"""
        self.stats_label.config(text=stats_text)
    
    def process_html_file(self, file_path):
        """Process a single HTML file - only add color palette"""
        try:
            self.log(f"Processing: {file_path.name}", 'info')
            
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Check if already processed
            if '/* Dark theme v2 - layout preserved */' in content:
                self.log(f"  ⊳ Already processed, skipping", 'warning')
                self.skipped_files += 1
                return True
            
            # Inject CSS in <head> or after <body> tag
            if '<head>' in content.lower():
                content = re.sub(r'</head>', INJECTED_STYLE + '</head>', content, flags=re.IGNORECASE)
            elif '<body>' in content.lower():
                content = re.sub(r'<body[^>]*>', r'\g<0>' + INJECTED_STYLE, content, flags=re.IGNORECASE)
            else:
                content = INJECTED_STYLE + content
            
            # Write back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            self.log(f"  ✓ Success! Color palette applied", 'success')
            self.processed_files += 1
            return True
            
        except Exception as e:
            self.log(f"  ✗ ERROR: {str(e)}", 'error')
            self.error_files += 1
            return False
    
    def run_processing(self):
        """Main processing function"""
        try:
            self.log("="*70, 'header')
            self.log("Starting Skills HTML Color Conversion", 'header')
            self.log("="*70, 'header')
            
            # Get the script's directory - it's already inside Skills folder
            script_dir = Path(__file__).parent
            
            all_files = []
            
            # Process files in current directory (Skills)
            self.log("\n📁 Scanning current directory for .htm files...", 'info')
            
            htm_files = list(script_dir.glob('*.htm'))
            
            if not htm_files:
                self.log(f"  ✗ No .htm files found in: {script_dir}", 'error')
                messagebox.showerror("Error", f"No .htm files found!\n\nCurrent location:\n{script_dir}\n\nPlease make sure .htm files are in the same folder as this script.")
                return
            
            all_files = htm_files
            self.log(f"  Found {len(htm_files)} .htm files", 'info')
            
            if not all_files:
                self.log("\n✗ No files to process!", 'error')
                return
            
            self.total_files = len(all_files)
            self.log(f"\n📊 Total files to process: {self.total_files}", 'header')
            self.log("="*70, 'header')
            
            # Process each file
            for i, file_path in enumerate(all_files, 1):
                self.log(f"\n[{i}/{self.total_files}]", 'header')
                self.process_html_file(file_path)
                self.update_stats()
            
            # Summary
            self.log("\n" + "="*70, 'header')
            self.log("✓ PROCESSING COMPLETE!", 'success')
            self.log("="*70, 'header')
            self.log(f"Total Files: {self.total_files}", 'info')
            self.log(f"Successfully Processed: {self.processed_files}", 'success')
            self.log(f"Skipped (already processed): {self.skipped_files}", 'warning')
            self.log(f"Errors: {self.error_files}", 'error' if self.error_files > 0 else 'info')
            self.log("="*70, 'header')
            
            # Show completion message
            if self.error_files == 0:
                messagebox.showinfo("Success!", 
                                   f"Processing complete!\n\n"
                                   f"Processed: {self.processed_files}\n"
                                   f"Skipped: {self.skipped_files}")
            else:
                messagebox.showwarning("Completed with Errors",
                                      f"Processing complete with some errors.\n\n"
                                      f"Processed: {self.processed_files}\n"
                                      f"Skipped: {self.skipped_files}\n"
                                      f"Errors: {self.error_files}\n\n"
                                      f"Check the log for details.")
            
        except Exception as e:
            self.log(f"\n✗ FATAL ERROR: {str(e)}", 'error')
            messagebox.showerror("Error", f"Fatal error occurred:\n{str(e)}")
        finally:
            self.progress.stop()
            self.start_button.config(state='normal')
            self.close_button.config(state='normal')
    
    def start_processing(self):
        """Start processing in a separate thread"""
        self.start_button.config(state='disabled')
        self.close_button.config(state='disabled')
        self.progress.start()
        
        # Reset stats
        self.total_files = 0
        self.processed_files = 0
        self.skipped_files = 0
        self.error_files = 0
        self.update_stats()
        
        # Clear log
        self.log_text.delete('1.0', 'end')
        
        # Run in thread to keep UI responsive
        thread = threading.Thread(target=self.run_processing)
        thread.daemon = True
        thread.start()

if __name__ == "__main__":
    root = tk.Tk()
    app = SkillsConverterGUI(root)
    root.mainloop()