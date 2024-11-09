# -*- coding: utf-8 -*-

# --- CODELINGO C++ PARSER ---
# Author: Leo Cabezas Amigo

"""
IDEAS: Implement pointers, references, arrays
"""

import os
import json

cpp_data_types = [
    # PRIMITIVE TYPES
    'int',
    'float',
    'double',
    'char',
    'bool',
    'void',
    'wchar_t',
    'short',
    'long',
    'unsigned int',
    'unsigned long',
    'unsigned short',
    'signed char',
    'unsigned char',
    'long long',            # C++11 and later
    'unsigned long long',   # C++11 and later

    # HARDCODED COMPOUND TYPES
    'std::string'
]

next_chars = {
    "line_wspc"         :   [" ", "\t"],  # Is also: "begin_dtype"
    "end_dtype"         :   [" ", "\t", "=", ";", "("],
    "begin_keyword"     :   [" ", "\t", "(", "{", ";", ":"],
    "fwd_var_name"      :   [   ["="],
                                ["+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "++", "--"],
                                ["<<=", ">>="]
                            ],
    "bwd_var_name"      :   [   ["++", "--"]
                            ]
}

class Parser_CPP:
    def __init__(self, code_file, eval_file = None):
        self.code = self._read_src(code_file)
        self.code_lines = self._read_src(code_file, byLine = True)